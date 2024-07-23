"use server";

import prisma from "@/shared/lib/prisma";
import { IMessage } from "@/features/message-area/model/use-message-status";

export const getMessages = async () => {
  return prisma.message.findMany({
    orderBy: { createdAt: "asc" },
  }) as IMessage[];
};

export const getMessage = async (uuid: string) => {
  return prisma.message.findUnique({
    where: {
      uuid,
    },
  }) as IMessage;
};

export const addMessage = async (message: IMessage) => {
  await prisma.message.create({ data: message });
  return message;
};

export const updateMessage = async (uuid: string, message: IMessage) => {
  await prisma.message.update({
    where: {
      uuid,
    },
    data: message,
  });
  return message;
};
