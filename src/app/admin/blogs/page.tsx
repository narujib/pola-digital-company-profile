import { AdminHeader } from "@/components/admin-header";

export default function AdminBlogsPage() {
  return (
    <>
      <AdminHeader items={[{ label: "Dashboard", href: "/admin/dashboard" }, { label: "Blog Posts" }]} />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="bg-muted/50 min-h-[50vh] flex-1 rounded-xl p-6">
          <p className="text-muted-foreground">Daftar blog akan ditampilkan di sini.</p>
        </div>
      </div>
    </>
  );
}
