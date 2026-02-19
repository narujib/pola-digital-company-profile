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

// JSON:API response shapes
interface JsonApiResource<A = Record<string, unknown>> {
  type: string;
  id: string;
  attributes: A;
}

interface JsonApiSingleResponse<A = Record<string, unknown>> {
  data: JsonApiResource<A>;
}

interface JsonApiListResponse<A = Record<string, unknown>> {
  data: JsonApiResource<A>[];
}

// Flat response shapes (consumed by hooks)
interface SubmitResponse {
  data: ContactMessage;
}

interface MessagesResponse {
  data: ContactMessage[];
}

// ==========================================
// Deserialization
// ==========================================

type ContactAttributes = Omit<ContactMessage, "id">;

function deserializeContact(resource: JsonApiResource<ContactAttributes>): ContactMessage {
  return {
    id: resource.id,
    ...resource.attributes,
  };
}

// ==========================================
// API Functions
// ==========================================

export async function submitContact(
  payload: SubmitContactPayload
): Promise<SubmitResponse> {
  const raw = await httpPost<JsonApiSingleResponse<ContactAttributes>>(
    "/api/contact",
    payload
  );

  return { data: deserializeContact(raw.data) };
}

export async function fetchMessages(): Promise<MessagesResponse> {
  const raw = await httpGet<JsonApiListResponse<ContactAttributes>>(
    "/api/admin/messages"
  );

  return { data: raw.data.map((r) => deserializeContact(r)) };
}
