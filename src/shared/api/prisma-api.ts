"use server";

import prisma from "@/shared/lib/prisma";
import { IMessage } from "@/features/message-area/model/types";
import { getServerSession } from "next-auth";
import { authOptions } from "@/shared/api/auth-options";

export const getMessages = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user) return [];

  return (await prisma.message.findMany({
    where: { userId: user.email },
    orderBy: { createdAt: "asc" },
  })) as IMessage[];
};

export const getMessage = async (uuid: string) => {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user) return [];

  return (await prisma.message.findUnique({
    where: {
      uuid,
      userId: user.email,
    },
  })) as IMessage;
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
