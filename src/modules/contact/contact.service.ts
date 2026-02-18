import * as contactRepo from "./contact.repository";
import type { CreateContactInput } from "./contact.validation";

export async function submitMessage(input: CreateContactInput) {
  return contactRepo.createMessage(input);
}

export async function getAllMessages() {
  return contactRepo.findAllMessages();
}
