import { NextRequest } from "next/server";
import { verifyToken, JwtPayload } from "@/lib/jwt";
import { jsonApiError } from "@/utils/response";

/**
 * Middleware untuk memverifikasi JWT token pada protected routes.
 *
 * Mengekstrak Bearer token dari Authorization header,
 * memverifikasi JWT, dan mengembalikan payload user.
 *
 * @returns JwtPayload jika valid, atau NextResponse error jika tidak valid
 */
export function authenticateRequest(
  req: NextRequest
): JwtPayload | ReturnType<typeof jsonApiError> {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return jsonApiError({
      code: "UNAUTHORIZED",
      detail: "Token tidak ditemukan",
      status: 401,
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = verifyToken(token);
    return payload;
  } catch {
    return jsonApiError({
      code: "UNAUTHORIZED",
      detail: "Token tidak valid atau sudah expired",
      status: 401,
    });
  }
}

/**
 * Type guard untuk mengecek apakah hasil authenticate adalah JwtPayload
 */
export function isAuthenticated(
  result: JwtPayload | ReturnType<typeof jsonApiError>
): result is JwtPayload {
  return "userId" in result;
}
