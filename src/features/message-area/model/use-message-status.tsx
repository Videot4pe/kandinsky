import {
  useUpdateMessageMutation,
  useUpdateMessageQuery,
} from "@/entities/message-area/queries";
import { uploadBase64ToS3 } from "@/shared/api/s3";
import { v4 as uuidv4 } from "uuid";

export type IMessage = {
  uuid: string;
  text: string;
  userId?: string | null;
  isPending?: boolean;
  censored?: boolean;
  hasError?: boolean;
  notFound?: boolean;
  createdAt?: string;
  image?: string;
};

export const useMessageStatus = (
  message: IMessage,
  { retry } = { retry: 10 }
) => {
  const messageQuery = useUpdateMessageQuery(
    message.uuid,
    !message.image && !message.notFound
  );
  const updateMessageMutation = useUpdateMessageMutation(message.uuid);

  if (message.notFound || message.image) {
    return false;
  }

  const update = async (message, image?: string) => {
    if (image) {
      const imageName = `${uuidv4()}.png`;
      message.image = await uploadBase64ToS3(image, imageName);
    }
    await updateMessageMutation.mutate(message);
  };

  if (messageQuery.data) {
    const { images, censored, notFound } = messageQuery.data;
    if (images) {
      message.hasError = false;
      message.censored = censored;
      update(message, images[0]);
    }
    if (notFound && !message.image) {
      message.notFound = true;
      update(message);
    }
  }

  if (messageQuery.error) {
    if (messageQuery.error?.response?.status === 404) {
      message.notFound = true;
      update(message);
    }
  }

  return { isLoading: messageQuery.isLoading, refetch: messageQuery.refetch };
};
