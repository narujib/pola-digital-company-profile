import { NextRequest } from "next/server";
import { getAllBlogsController } from "@/modules/blog/blog.controller";

export async function GET(req: NextRequest) {
  return getAllBlogsController(req);
}
