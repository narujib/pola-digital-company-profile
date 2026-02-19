import { httpPost } from "@/lib/http";

interface LoginPayload {
  email: string;
  password: string;
}

// JSON:API response shape from login endpoint
interface JsonApiLoginResponse {
  data: {
    type: string;
    id: string;
    attributes: {
      token: string;
      user: {
        id: string;
        name: string;
        email: string;
      };
    };
  };
}

// Flat response shape (consumed by AuthContext)
interface LoginResponse {
  data: {
    token: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
  };
}

export async function loginRequest(payload: LoginPayload): Promise<LoginResponse> {
  const raw = await httpPost<JsonApiLoginResponse>("/api/auth/login", payload);

  return {
    data: {
      token: raw.data.attributes.token,
      user: raw.data.attributes.user,
    },
  };
}
