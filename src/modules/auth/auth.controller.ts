import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/utils/response";
import { withErrorHandler } from "@/utils/error-handler";
import { loginSchema } from "./auth.validation";
import { login } from "./auth.service";

export const loginController = withErrorHandler(async (req: NextRequest) => {
  const body = await req.json();

  const result = loginSchema.safeParse(body);
  if (!result.success) {
    return errorResponse({
      code: "VALIDATION_ERROR",
      message: result.error.issues[0].message,
      status: 400,
    });
  }

  const data = await login(result.data);

  return successResponse({ data, status: 200 });
});
