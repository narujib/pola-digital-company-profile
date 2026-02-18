import { NextResponse } from "next/server";

// ==========================================
// Types
// ==========================================

interface SuccessResponseOptions<T> {
  data: T;
  meta?: Record<string, unknown>;
  status?: number;
}

interface ErrorResponseOptions {
  code: string;
  message: string;
  status?: number;
}

// ==========================================
// Success Response
// ==========================================

export function successResponse<T>({
  data,
  meta,
  status = 200,
}: SuccessResponseOptions<T>) {
  return NextResponse.json(
    {
      success: true,
      data,
      ...(meta && { meta }),
    },
    { status }
  );
}

// ==========================================
// Error Response
// ==========================================

export function errorResponse({
  code,
  message,
  status = 400,
}: ErrorResponseOptions) {
  return NextResponse.json(
    {
      success: false,
      error: {
        code,
        message,
      },
    },
    { status }
  );
}
