import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/utils/response";
import { withErrorHandler } from "@/utils/error-handler";
import { createContactSchema } from "./contact.validation";
import * as contactService from "./contact.service";

// ==========================================
// Submit Contact Message (Public)
// ==========================================

export const submitContactController = withErrorHandler(
  async (req: NextRequest) => {
    const body = await req.json();
    const result = createContactSchema.safeParse(body);

    if (!result.success) {
      return errorResponse({
        code: "VALIDATION_ERROR",
        message: result.error.issues[0].message,
        status: 400,
      });
    }

    const message = await contactService.submitMessage(result.data);

    return successResponse({ data: message, status: 201 });
  }
);

// ==========================================
// Get All Messages (Admin)
// ==========================================

export const getAllMessagesController = withErrorHandler(async () => {
  const messages = await contactService.getAllMessages();

  return successResponse({ data: messages });
});
