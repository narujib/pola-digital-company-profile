import { NextRequest } from "next/server";
import { getAllMessagesController } from "@/modules/contact/contact.controller";
import {
  authenticateRequest,
  isAuthenticated,
} from "@/middlewares/auth.middleware";

export async function GET(req: NextRequest) {
  const auth = authenticateRequest(req);

  if (!isAuthenticated(auth)) {
    return auth;
  }

  return getAllMessagesController(req);
}
