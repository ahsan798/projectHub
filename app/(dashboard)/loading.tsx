export default function DashboardLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <div className="h-8 w-64 skeleton" />
          <div className="h-4 w-48 skeleton" />
        </div>
        <div className="h-10 w-32 skeleton rounded-[var(--radius-md)]" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="card p-5 h-32 skeleton" />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card p-5 lg:col-span-2 h-64 skeleton" />
        <div className="card p-5 lg:col-span-1 h-64 skeleton" />
      </div>
    </div>
  );
}
