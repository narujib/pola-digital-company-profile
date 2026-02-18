const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

interface HttpError {
  code: string;
  message: string;
}

export class ApiError extends Error {
  code: string;
  status: number;

  constructor(code: string, message: string, status: number) {
    super(message);
    this.code = code;
    this.status = status;
    this.name = "ApiError";
  }
}

async function request<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  // Attach Authorization header if token exists in localStorage
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const res = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers,
  });

  const json = await res.json();

  if (!json.success) {
    const error = json.error as HttpError;
    throw new ApiError(
      error.code || "UNKNOWN_ERROR",
      error.message || "Terjadi kesalahan",
      res.status
    );
  }

  return json;
}

// ==========================================
// Public API Functions
// ==========================================

export function httpGet<T = unknown>(url: string): Promise<T> {
  return request<T>(url, { method: "GET" });
}

export function httpPost<T = unknown>(
  url: string,
  body: unknown
): Promise<T> {
  return request<T>(url, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function httpPut<T = unknown>(
  url: string,
  body: unknown
): Promise<T> {
  return request<T>(url, {
    method: "PUT",
    body: JSON.stringify(body),
  });
}

export function httpDelete<T = unknown>(url: string): Promise<T> {
  return request<T>(url, { method: "DELETE" });
}
