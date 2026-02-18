"use client";

import { useBlogs } from "@/features/blog/blog.hooks";
import { useContactMessages } from "@/features/contact/contact.hooks";
import { AdminHeader } from "@/components/admin-header";
import { FileText, Eye, MessageSquare } from "lucide-react";

export default function AdminDashboardPage() {
  const { blogs, total: totalBlogs, loading: blogsLoading, error: blogsError } = useBlogs({ limit: 100 });
  const { total: totalMessages, loading: messagesLoading, error: messagesError } = useContactMessages();

  const publishedCount = blogs.filter((b) => b.isPublished).length;

  return (
    <>
      <AdminHeader items={[{ label: "Dashboard" }]} />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <StatCard
            icon={FileText}
            label="Total Blogs"
            value={totalBlogs}
            loading={blogsLoading}
            error={blogsError}
          />
          <StatCard
            icon={Eye}
            label="Published"
            value={publishedCount}
            loading={blogsLoading}
            error={blogsError}
          />
          <StatCard
            icon={MessageSquare}
            label="Messages"
            value={totalMessages}
            loading={messagesLoading}
            error={messagesError}
          />
        </div>
        <div className="bg-muted/50 min-h-[50vh] flex-1 rounded-xl p-6">
          <p className="text-muted-foreground">Welcome to Pola Digital admin panel.</p>
        </div>
      </div>
    </>
  );
}

// ==========================================
// Stat Card Component
// ==========================================

function StatCard({
  icon: Icon,
  label,
  value,
  loading,
  error,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  loading: boolean;
  error: string | null;
}) {
  return (
    <div className="bg-muted/50 rounded-xl p-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
        <Icon className="size-4" />
        <span>{label}</span>
      </div>
      {loading ? (
        <div className="h-9 w-16 animate-pulse rounded bg-muted" />
      ) : error ? (
        <p className="text-sm text-destructive">{error}</p>
      ) : (
        <p className="text-3xl font-bold">{value}</p>
      )}
    </div>
  );
}
