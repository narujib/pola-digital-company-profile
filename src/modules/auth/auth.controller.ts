import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/utils/response";
import { loginSchema } from "./auth.validation";
import { login, AuthError } from "./auth.service";

export async function loginController(req: NextRequest) {
  try {
    // 1. Parse request body
    const body = await req.json();

    // 2. Validate input
    const result = loginSchema.safeParse(body);

    if (!result.success) {
      return errorResponse({
        code: "VALIDATION_ERROR",
        message: result.error.issues[0].message,
        status: 400,
      });
    }

    // 3. Call service
    const data = await login(result.data);

    // 4. Return success response
    return successResponse({ data, status: 200 });
  } catch (error) {
    if (error instanceof AuthError) {
      return errorResponse({
        code: error.code,
        message: error.message,
        status: 401,
      });
    }

    console.error("Login error:", error);
    return errorResponse({
      code: "INTERNAL_ERROR",
      message: "Terjadi kesalahan internal",
      status: 500,
    });
  }
}
