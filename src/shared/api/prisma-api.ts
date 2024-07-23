"use server";

import prisma from "@/shared/lib/prisma";
import { IMessage } from "@/features/message-area/model/use-message-status";

export const getMessages = async () => {
  return (await prisma.message.findMany({
    orderBy: { createdAt: "asc" },
  })) as IMessage[];
};

export const getMessage = async (uuid: string) => {
  return (await prisma.message.findUnique({
    where: {
      uuid,
    },
  })) as IMessage;
};

export const addMessage = async (message: IMessage) => {
  return prisma.message.create({ data: message });
};

export const updateMessage = async (uuid: string, message: IMessage) => {
  return prisma.message.update({
    where: {
      uuid,
    },
    data: message,
  });
};
