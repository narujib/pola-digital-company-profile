import { NextRequest } from "next/server";
import { submitContactController } from "@/modules/contact/contact.controller";

export async function POST(req: NextRequest) {
  return submitContactController(req);
}
