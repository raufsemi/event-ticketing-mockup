import { randomBytes, randomUUID, scrypt as scryptCb, timingSafeEqual } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

const scrypt = promisify(scryptCb) as (pw: string, salt: Buffer, len: number) => Promise<Buffer>;

// Mockup storage: a JSON file on disk. Swap for a real database before launch.
const DB_FILE = path.join(process.cwd(), ".data", "users.json");

type StoredUser = {
  id: string;
  name: string;
  email: string;
  passwordHash: string; // salt:hash, both hex
  createdAt: string;
};

/** The only user shape that leaves the server. */
export type User = { id: string; name: string; email: string; createdAt: string };

const toPublic = ({ id, name, email, createdAt }: StoredUser): User => ({ id, name, email, createdAt });

async function readAll(): Promise<StoredUser[]> {
  try {
    return JSON.parse(await readFile(DB_FILE, "utf8"));
  } catch {
    return [];
  }
}

async function writeAll(users: StoredUser[]) {
  await mkdir(path.dirname(DB_FILE), { recursive: true });
  await writeFile(DB_FILE, JSON.stringify(users, null, 2));
}

async function hashPassword(password: string) {
  const salt = randomBytes(16);
  const hash = await scrypt(password, salt, 64);
  return `${salt.toString("hex")}:${hash.toString("hex")}`;
}

async function verifyPassword(password: string, stored: string) {
  const [saltHex, hashHex] = stored.split(":");
  const expected = Buffer.from(hashHex, "hex");
  const actual = await scrypt(password, Buffer.from(saltHex, "hex"), expected.length);
  return timingSafeEqual(expected, actual);
}

export async function findUserById(id: string): Promise<User | null> {
  const user = (await readAll()).find((u) => u.id === id);
  return user ? toPublic(user) : null;
}

export async function createUser(name: string, email: string, password: string): Promise<User | null> {
  const users = await readAll();
  const normalized = email.trim().toLowerCase();
  if (users.some((u) => u.email === normalized)) return null;
  const user: StoredUser = {
    id: randomUUID(),
    name: name.trim(),
    email: normalized,
    passwordHash: await hashPassword(password),
    createdAt: new Date().toISOString(),
  };
  await writeAll([...users, user]);
  return toPublic(user);
}

export async function authenticate(email: string, password: string): Promise<User | null> {
  const user = (await readAll()).find((u) => u.email === email.trim().toLowerCase());
  if (!user || !(await verifyPassword(password, user.passwordHash))) return null;
  return toPublic(user);
}
