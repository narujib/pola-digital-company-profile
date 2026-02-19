"use client";

import { AdminHeader } from "@/components/admin-header";
import { useContactMessages } from "@/features/contact/contact.hooks";
import { MessageListTable } from "@/features/contact/components/message-list-table";

export default function AdminMessagesPage() {
  const { messages, loading, error } = useContactMessages();

  return (
    <>
      <AdminHeader
        items={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Messages" },
        ]}
      />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Pesan Masuk</h1>
        </div>

        {error && (
          <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <MessageListTable
          messages={messages}
          loading={loading}
        />
      </div>
    </>
  );
}
