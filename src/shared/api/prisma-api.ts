"use server";

import prisma from "@/shared/lib/prisma";
import { IMessage } from "@/entities/message-area/types";
import { Prisma } from ".prisma/client";
import SortOrder = Prisma.SortOrder;
import { auth } from "@/shared/lib/auth";

export type MessagesOptions = {
  orderBy?: { createdAt: SortOrder };
  page?: number;
  pageSize?: number;
};

type RequiredMessagesOptions = Required<MessagesOptions>;

export const getMessages = async (
  options: MessagesOptions
): Promise<IMessage[]> => {
  // TODO can() write fn (upper layer)
  const session = await auth();
  const user = session?.user;
  if (!user) return [];

  const defaultOptions: RequiredMessagesOptions = {
    orderBy: { createdAt: "desc" },
    page: 0,
    pageSize: 18,
  };
  const localOptions: RequiredMessagesOptions = {
    ...defaultOptions,
    ...options,
  };
  return (await prisma.message.findMany({
    skip: localOptions.page * localOptions.pageSize,
    take: localOptions.pageSize,
    where: { userId: user.email },
    orderBy: localOptions.orderBy ?? { createdAt: "desc" },
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
