"use client";

import { useState, useEffect } from "react";
import { fetchMessages } from "@/features/contact/contact.api";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

interface UseContactMessagesResult {
  messages: ContactMessage[];
  total: number;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useContactMessages(): UseContactMessagesResult {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchMessages();
      setMessages(result.data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Gagal memuat pesan"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return {
    messages,
    total: messages.length,
    loading,
    error,
    refetch: load,
  };
}
