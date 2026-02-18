export default function AdminDashboardPage() {
  return (
    <>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="bg-muted/50 rounded-xl p-6">
          <p className="text-sm text-muted-foreground">Total Blogs</p>
          <p className="text-3xl font-bold">—</p>
        </div>
        <div className="bg-muted/50 rounded-xl p-6">
          <p className="text-sm text-muted-foreground">Published</p>
          <p className="text-3xl font-bold">—</p>
        </div>
        <div className="bg-muted/50 rounded-xl p-6">
          <p className="text-sm text-muted-foreground">Messages</p>
          <p className="text-3xl font-bold">—</p>
        </div>
      </div>
      <div className="bg-muted/50 min-h-[50vh] flex-1 rounded-xl p-6">
        <p className="text-muted-foreground">Welcome to Pola Digital admin panel.</p>
      </div>
    </>
  );
}
