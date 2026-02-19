import { NextRequest } from "next/server";
import { jsonApiSingle, jsonApiError } from "@/utils/response";
import { withErrorHandler } from "@/utils/error-handler";
import { loginSchema } from "./auth.validation";
import { login } from "./auth.service";

export const loginController = withErrorHandler(async (req: NextRequest) => {
  const body = await req.json();

  const result = loginSchema.safeParse(body);
  if (!result.success) {
    return jsonApiError({
      code: "VALIDATION_ERROR",
      detail: result.error.issues[0].message,
      status: 400,
    });
  }

  const data = await login(result.data);

  return jsonApiSingle({
    type: "tokens",
    id: data.user.id,
    attributes: {
      token: data.token,
      user: data.user,
    },
    status: 200,
  });
});
