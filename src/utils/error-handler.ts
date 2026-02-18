import { NextRequest, NextResponse } from "next/server";
import { errorResponse } from "@/utils/response";
import { AuthError } from "@/modules/auth/auth.service";
import { BlogError } from "@/modules/blog/blog.service";

// ==========================================
// Base Application Error
// ==========================================

export class AppError extends Error {
  code: string;
  statusCode: number;

  constructor(code: string, message: string, statusCode: number = 400) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
    this.name = "AppError";
  }
}

// ==========================================
// Error Status Mapping
// ==========================================

function getErrorStatus(error: AuthError | BlogError | AppError): number {
  // AppError sudah punya statusCode
  if (error instanceof AppError) {
    return error.statusCode;
  }

  // AuthError selalu 401
  if (error instanceof AuthError) {
    return 401;
  }

  // BlogError tergantung code
  if (error instanceof BlogError) {
    switch (error.code) {
      case "NOT_FOUND":
        return 404;
      default:
        return 400;
    }
  }

  return 400;
}

// ==========================================
// Controller Wrapper
// ==========================================

type ControllerFn = (
  req: NextRequest,
  context?: Record<string, unknown>
) => Promise<NextResponse>;

/**
 * Wraps a controller function with global error handling.
 *
 * Usage:
 * ```ts
 * export const POST = withErrorHandler(async (req) => {
 *   // controller logic...
 *   return successResponse({ data });
 * });
 * ```
 */
export function withErrorHandler(fn: ControllerFn): ControllerFn {
  return async (req: NextRequest, context?: Record<string, unknown>) => {
    try {
      return await fn(req, context);
    } catch (error) {
      // Known application errors
      if (
        error instanceof AuthError ||
        error instanceof BlogError ||
        error instanceof AppError
      ) {
        return errorResponse({
          code: error.code,
          message: error.message,
          status: getErrorStatus(error),
        });
      }

      // Zod validation errors
      if (error && typeof error === "object" && "issues" in error) {
        const zodError = error as { issues: Array<{ message: string }> };
        return errorResponse({
          code: "VALIDATION_ERROR",
          message: zodError.issues[0]?.message ?? "Validasi gagal",
          status: 400,
        });
      }

      // Unknown errors
      console.error("Unhandled error:", error);
      return errorResponse({
        code: "INTERNAL_ERROR",
        message: "Terjadi kesalahan internal",
        status: 500,
      });
    }
  };
}
