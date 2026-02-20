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

// ==========================================
// Contact Form Hook
// ==========================================

import { submitContact } from "@/features/contact/contact.api";
import { createContactSchema } from "@/modules/contact/contact.validation";
import { z } from "zod/v4";

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export function useContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [dialogConfig, setDialogConfig] = useState<{
    isOpen: boolean;
    variant: "success" | "error";
    title: string;
    description: string;
  }>({
    isOpen: false,
    variant: "success",
    title: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const closeDialog = () => {
    setDialogConfig((prev) => ({ ...prev, isOpen: false }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      // Validate with Zod
      createContactSchema.parse(formData);

      await submitContact(formData);
      setDialogConfig({
        isOpen: true,
        variant: "success",
        title: "Pesan Terkirim!",
        description:
          "Terima kasih telah menghubungi kami. Kami akan segera membalas pesan Anda.",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: { [key: string]: string } = {};
        error.issues.forEach((err) => {
          if (err.path && err.path.length > 0) {
            const fieldName = err.path[0].toString();
            newErrors[fieldName] = err.message;
          }
        });
        setErrors(newErrors);
      } else {
        setDialogConfig({
          isOpen: true,
          variant: "error",
          title: "Gagal Mengirim",
          description:
            error instanceof Error
              ? error.message
              : "Terjadi kesalahan saat mengirim pesan. Silakan coba lagi nanti.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    errors,
    isLoading,
    dialogConfig,
    handleChange,
    handleSubmit,
    closeDialog,
  };
}

