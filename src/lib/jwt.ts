import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

// ==========================================
// Types
// ==========================================

export interface JwtPayload {
  userId: string;
  email: string;
}

// ==========================================
// Sign Token
// ==========================================

export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
  });
}

// ==========================================
// Verify Token
// ==========================================

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
}
