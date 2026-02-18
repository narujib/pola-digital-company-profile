import { prisma } from "@/lib/prisma";
import type { CreateContactInput } from "./contact.validation";

export async function createMessage(data: CreateContactInput) {
  return prisma.contactMessage.create({ data });
}

export async function findAllMessages() {
  return prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });
}
