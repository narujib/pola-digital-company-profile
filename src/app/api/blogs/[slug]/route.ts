import { NextRequest } from "next/server";
import { getBlogBySlugController } from "@/modules/blog/blog.controller";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  return getBlogBySlugController(req, slug);
}
