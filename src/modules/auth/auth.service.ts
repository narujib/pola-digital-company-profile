import bcrypt from "bcrypt";
import { signToken } from "@/lib/jwt";
import { findUserByEmail } from "./auth.repository";
import { LoginInput } from "./auth.validation";

export async function login(input: LoginInput) {
  // 1. Cari user berdasarkan email
  const user = await findUserByEmail(input.email);

  if (!user) {
    throw new AuthError("INVALID_CREDENTIALS", "Email atau password salah");
  }

  // 2. Bandingkan password
  const isPasswordValid = await bcrypt.compare(input.password, user.password);

  if (!isPasswordValid) {
    throw new AuthError("INVALID_CREDENTIALS", "Email atau password salah");
  }

  // 3. Generate JWT token
  const token = signToken({
    userId: user.id,
    email: user.email,
  });

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
}

// ==========================================
// Custom Error
// ==========================================

export class AuthError extends Error {
  code: string;

  constructor(code: string, message: string) {
    super(message);
    this.code = code;
    this.name = "AuthError";
  }
}
