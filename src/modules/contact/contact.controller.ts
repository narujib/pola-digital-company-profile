import { NextRequest } from "next/server";
import { jsonApiSingle, jsonApiList, jsonApiError } from "@/utils/response";
import { withErrorHandler } from "@/utils/error-handler";
import { createContactSchema } from "./contact.validation";
import * as contactService from "./contact.service";

// ==========================================
// Serialization Helper
// ==========================================

interface ContactRecord {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: Date;
}

function serializeContactAttributes(msg: ContactRecord) {
  return {
    name: msg.name,
    email: msg.email,
    message: msg.message,
    createdAt: msg.createdAt.toISOString(),
  };
}

// ==========================================
// Submit Contact Message (Public)
// ==========================================

export const submitContactController = withErrorHandler(
  async (req: NextRequest) => {
    const body = await req.json();
    const result = createContactSchema.safeParse(body);

    if (!result.success) {
      return jsonApiError({
        code: "VALIDATION_ERROR",
        detail: result.error.issues[0].message,
        status: 400,
      });
    }

    const message = await contactService.submitMessage(result.data) as ContactRecord;

    return jsonApiSingle({
      type: "contact-messages",
      id: message.id,
      attributes: serializeContactAttributes(message),
      status: 201,
    });
  }
);

// ==========================================
// Get All Messages (Admin)
// ==========================================

export const getAllMessagesController = withErrorHandler(async () => {
  const messages = await contactService.getAllMessages() as ContactRecord[];

  return jsonApiList({
    type: "contact-messages",
    items: messages.map((msg) => ({
      id: msg.id,
      attributes: serializeContactAttributes(msg),
    })),
  });
});
