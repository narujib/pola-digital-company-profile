import { z } from "zod/v4";

export const createContactSchema = z.object({
  name: z
    .string()
    .min(1, "Nama wajib diisi")
    .max(100, "Nama maksimal 100 karakter"),
  email: z
    .string()
    .email("Format email tidak valid")
    .max(150, "Email maksimal 150 karakter"),
  message: z
    .string()
    .min(1, "Pesan wajib diisi")
    .max(2000, "Pesan maksimal 2000 karakter"),
});

export type CreateContactInput = z.infer<typeof createContactSchema>;
