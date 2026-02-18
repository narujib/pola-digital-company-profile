import { httpGet, httpPost } from "@/lib/http";

// ==========================================
// Types
// ==========================================

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

interface SubmitContactPayload {
  name: string;
  email: string;
  message: string;
}

interface SubmitResponse {
  success: true;
  data: ContactMessage;
}

interface MessagesResponse {
  success: true;
  data: ContactMessage[];
}

// ==========================================
// API Functions
// ==========================================

export function submitContact(
  payload: SubmitContactPayload
): Promise<SubmitResponse> {
  return httpPost<SubmitResponse>("/api/contact", payload);
}

export function fetchMessages(): Promise<MessagesResponse> {
  return httpGet<MessagesResponse>("/api/admin/messages");
}
