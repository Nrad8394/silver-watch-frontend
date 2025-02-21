import { Skeleton } from "@/components/ui/skeleton"

export function LoadingDashboard() {
  return (
    <div className="grid gap-6">
      <section className="space-y-4">
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-[100px] w-full" />
      </section>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {Array(4)
          .fill(null)
          .map((_, i) => (
            <Skeleton key={i} className="h-[120px]" />
          ))}
      </section>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-full lg:col-span-2">
          <Skeleton className="h-[400px]" />
        </div>
        <div className="col-span-full lg:col-span-1">
          <Skeleton className="h-[400px]" />
        </div>
      </section>
    </div>
  )
}

