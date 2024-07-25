import { IMessageImage } from "@/entities/images/model/types";

export type IMessage = {
  uuid: string;
  text: string;
  userId?: string | null;
  isPending?: boolean;
  censored?: boolean;
  hasError?: boolean;
  notFound?: boolean;
  createdAt?: string | Date;
  image?: string;

  width?: number;
  height?: number;
  style?: string;
  negativePrompt?: string;
};

export const isMessageImage = (message: IMessage): message is IMessageImage => {
  return (
    !!message.image &&
    !!message.width &&
    !!message.height &&
    !!message.style &&
    !!message.createdAt
  );
};
