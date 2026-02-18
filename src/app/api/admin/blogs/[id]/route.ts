import { NextRequest } from "next/server";
import {
  updateBlogController,
  deleteBlogController,
} from "@/modules/blog/blog.controller";
import {
  authenticateRequest,
  isAuthenticated,
} from "@/middlewares/auth.middleware";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = authenticateRequest(req);

  if (!isAuthenticated(auth)) {
    return auth;
  }

  const { id } = await params;
  return updateBlogController(req, id);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = authenticateRequest(req);

  if (!isAuthenticated(auth)) {
    return auth;
  }

  const { id } = await params;
  return deleteBlogController(id);
}
