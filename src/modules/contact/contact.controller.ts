import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/utils/response";
import { createContactSchema } from "./contact.validation";
import * as contactService from "./contact.service";

// ==========================================
// Submit Contact Message (Public)
// ==========================================

export async function submitContactController(req: NextRequest) {
  try {
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
  } catch (error) {
    console.error("Submit contact error:", error);
    return errorResponse({
      code: "INTERNAL_ERROR",
      message: "Terjadi kesalahan internal",
      status: 500,
    });
  }
}

// ==========================================
// Get All Messages (Admin)
// ==========================================

export async function getAllMessagesController() {
  try {
    const messages = await contactService.getAllMessages();

    return successResponse({ data: messages });
  } catch (error) {
    console.error("Get messages error:", error);
    return errorResponse({
      code: "INTERNAL_ERROR",
      message: "Terjadi kesalahan internal",
      status: 500,
    });
  }
}
