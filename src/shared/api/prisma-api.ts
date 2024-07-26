"use server";

import prisma from "@/shared/lib/prisma";
import { IMessage } from "@/entities/message-area/types";
import { getServerSession } from "next-auth";
import { authOptions } from "@/shared/api/auth-options";
import { Prisma } from ".prisma/client";
import SortOrder = Prisma.SortOrder;

export const getMessages = async (
  options: { orderBy: { createdAt: SortOrder } } = {
    orderBy: { createdAt: "asc" },
  }
) => {
  // TODO can() write fn (upper layer)
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user) return [];

  return (await prisma.message.findMany({
    where: { userId: user.email },
    orderBy: options.orderBy ?? { createdAt: "asc" },
  })) as IMessage[];
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
