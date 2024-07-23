// "use server";

import prisma from "@/shared/lib/prisma";

export const getMessages = async () => {
  return prisma.message.findMany({ orderBy: { createdAt: "desc" } });
};

export const addMessage = async (message) => {
  await prisma.message.create({ data: message });
  return message;
};

export const updateMessage = async (uuid, message) => {
  await prisma.message.update({
    where: {
      uuid,
    },
    data: message,
  });
  return message;
};
