import { NextRequest } from "next/server";
import { createBlogController } from "@/modules/blog/blog.controller";
import {
  authenticateRequest,
  isAuthenticated,
} from "@/middlewares/auth.middleware";

export async function POST(req: NextRequest) {
  const auth = authenticateRequest(req);

  if (!isAuthenticated(auth)) {
    return auth; // Return error response
  }

  return createBlogController(req, auth.userId);
}
