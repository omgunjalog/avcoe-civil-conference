function SkeletonBlock({ className = '' }) {
  return <div className={`skeleton-block ${className}`.trim()} />
}

function HeroSkeleton() {
  return (
    <div className="space-y-5">
      <SkeletonBlock className="h-7 w-40 rounded-full" />
      <SkeletonBlock className="h-16 w-full max-w-3xl" />
      <SkeletonBlock className="h-6 w-full max-w-2xl" />
      <SkeletonBlock className="h-6 w-3/4 max-w-xl" />
    </div>
  )
}

function CardSkeletonGrid({ count = 4, className = '' }) {
  return (
    <div className={`grid gap-6 md:grid-cols-2 xl:grid-cols-4 ${className}`.trim()}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="surface-card space-y-4">
          <SkeletonBlock className="h-12 w-12 rounded-2xl" />
          <SkeletonBlock className="h-8 w-4/5" />
          <SkeletonBlock className="h-5 w-full" />
          <SkeletonBlock className="h-5 w-11/12" />
          <SkeletonBlock className="h-11 w-36 rounded-full" />
        </div>
      ))}
    </div>
  )
}

function AdminSkeleton() {
  return (
    <div className="content-grid py-10">
      <div className="surface-card-dark engineering-panel">
        <HeroSkeleton />
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={index} className="surface-card space-y-4">
            <SkeletonBlock className="h-5 w-32" />
            <SkeletonBlock className="h-12 w-24" />
            <SkeletonBlock className="h-5 w-full" />
          </div>
        ))}
      </div>
      <div className="surface-card mt-8 space-y-5">
        <div className="grid gap-4 xl:grid-cols-4">
          <SkeletonBlock className="h-12 w-full rounded-2xl" />
          <SkeletonBlock className="h-12 w-full rounded-2xl" />
          <SkeletonBlock className="h-12 w-full rounded-2xl" />
          <SkeletonBlock className="h-12 w-full rounded-2xl" />
        </div>
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonBlock key={index} className="h-14 w-full rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  )
}

function ResultSkeleton() {
  return (
    <div className="surface-card section-alt-light space-y-5">
      <SkeletonBlock className="h-6 w-40" />
      <SkeletonBlock className="h-10 w-3/4" />
      <div className="grid gap-4 md:grid-cols-2">
        <SkeletonBlock className="h-24 w-full rounded-2xl" />
        <SkeletonBlock className="h-24 w-full rounded-2xl" />
      </div>
      <SkeletonBlock className="h-28 w-full rounded-[28px]" />
      <SkeletonBlock className="h-24 w-full rounded-[28px]" />
    </div>
  )
}

export { AdminSkeleton, CardSkeletonGrid, HeroSkeleton, ResultSkeleton, SkeletonBlock }

