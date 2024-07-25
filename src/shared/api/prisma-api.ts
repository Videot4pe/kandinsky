"use server";

import prisma from "@/shared/lib/prisma";
import { IMessage } from "@/entities/message-area/types";
import { getServerSession } from "next-auth";
import { authOptions } from "@/shared/api/auth-options";
import { v4 as uuidv4 } from "uuid";
import { uploadBase64ToS3 } from "@/shared/api/s3-api";

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
  if (message.image && message.image?.startsWith("data:image")) {
    const imageName = `${uuidv4()}.png`;
    const rawImage = message.image.replace("data:image/png;base64,", "");
    message.image = await uploadBase64ToS3(rawImage, imageName);
  }

  await prisma.message.update({
    where: {
      uuid,
    },
    data: message,
  });
  return message;
};
