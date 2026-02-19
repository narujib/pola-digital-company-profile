"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Eye } from "lucide-react";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

interface MessageListTableProps {
  messages: ContactMessage[];
  loading: boolean;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function MessageListTable({
  messages,
  loading,
}: MessageListTableProps) {
  const [selected, setSelected] = useState<ContactMessage | null>(null);

  if (loading) {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Pesan</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead className="w-[80px]">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell><Skeleton className="h-6 w-[120px]" /></TableCell>
                <TableCell><Skeleton className="h-6 w-[180px]" /></TableCell>
                <TableCell><Skeleton className="h-6 w-[250px]" /></TableCell>
                <TableCell><Skeleton className="h-6 w-[100px]" /></TableCell>
                <TableCell><Skeleton className="h-8 w-8 rounded-full" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="min-w-[300px]">Pesan</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead className="w-[80px]">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  Belum ada pesan masuk.
                </TableCell>
              </TableRow>
            ) : (
              messages.map((msg) => (
                <TableRow key={msg.id}>
                  <TableCell className="font-medium whitespace-nowrap">
                    {msg.name}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <a
                      href={`mailto:${msg.email}`}
                      className="text-primary hover:underline"
                    >
                      {msg.email}
                    </a>
                  </TableCell>
                  <TableCell>
                    <p className="line-clamp-2 max-w-[400px]">
                      {msg.message}
                    </p>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {formatDate(msg.createdAt)}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelected(msg)}
                    >
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">Detail</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Detail Pesan</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-4">
              <div className="grid grid-cols-[100px_1fr] gap-2 text-sm">
                <span className="font-medium text-muted-foreground">Nama</span>
                <span>{selected.name}</span>
                <span className="font-medium text-muted-foreground">Email</span>
                <a
                  href={`mailto:${selected.email}`}
                  className="text-primary hover:underline"
                >
                  {selected.email}
                </a>
                <span className="font-medium text-muted-foreground">Tanggal</span>
                <span>{formatDate(selected.createdAt)}</span>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">Pesan</span>
                <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed rounded-md bg-muted p-3">
                  {selected.message}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

