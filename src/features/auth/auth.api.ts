import { httpPost } from "@/lib/http";

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  success: true;
  data: {
    token: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
  };
}

export function loginRequest(payload: LoginPayload): Promise<LoginResponse> {
  return httpPost<LoginResponse>("/api/auth/login", payload);
}
