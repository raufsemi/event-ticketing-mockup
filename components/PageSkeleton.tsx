/** Loading placeholder shown while a param-dependent page streams in after navigation. */
export default function PageSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading" className="animate-pulse motion-reduce:animate-none">
      <div className="bg-tint">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 pt-10 pb-16 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="space-y-5">
            <div className="h-4 w-40 rounded-full bg-line" />
            <div className="h-14 w-14 rounded-2xl bg-line" />
            <div className="h-12 w-4/5 rounded-2xl bg-line" />
            <div className="h-12 w-3/5 rounded-2xl bg-line" />
            <div className="h-5 w-full max-w-md rounded-full bg-line" />
            <div className="flex gap-3 pt-4">
              <div className="h-14 w-40 rounded-full bg-line" />
              <div className="h-14 w-40 rounded-full bg-line" />
            </div>
          </div>
          <div className="aspect-[4/3] rounded-[2rem] bg-line" />
        </div>
      </div>
      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-20 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="h-48 rounded-3xl bg-tint" />
        ))}
      </div>
    </div>
  );
}
