import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function AdminDashboardPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
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
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
