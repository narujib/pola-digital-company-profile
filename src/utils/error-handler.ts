import { NextRequest, NextResponse } from "next/server";
import { jsonApiError } from "@/utils/response";
import { AuthError } from "@/modules/auth/auth.service";
import { BlogError } from "@/modules/blog/blog.service";
import { CategoryError } from "@/modules/category/category.service";

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

function getErrorStatus(error: AuthError | BlogError | CategoryError | AppError): number {
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

  // CategoryError depending on code
  if (error instanceof CategoryError) {
    switch (error.code) {
      case "NOT_FOUND":
        return 404;
      default:
        return 400; // SLUG_EXISTS, NAME_EXISTS, etc.
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
 *   return jsonApiSingle({ type, id, attributes });
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
        error instanceof CategoryError ||
        error instanceof AppError
      ) {
        return jsonApiError({
          code: error.code,
          detail: error.message,
          status: getErrorStatus(error),
        });
      }

      // Zod validation errors
      if (error && typeof error === "object" && "issues" in error) {
        const zodError = error as { issues: Array<{ message: string }> };
        return jsonApiError({
          code: "VALIDATION_ERROR",
          detail: zodError.issues[0]?.message ?? "Validasi gagal",
          status: 400,
        });
      }

      // Unknown errors
      console.error("[Unhandled Error]", error); // Log full error object
      if (error instanceof Error) {
        console.error("Stack:", error.stack);
      }
      
      return jsonApiError({
        code: "INTERNAL_ERROR",
        detail: error instanceof Error ? error.message : "Terjadi kesalahan internal", // Return actual error message in dev
        status: 500,
      });
    }
  };
}
