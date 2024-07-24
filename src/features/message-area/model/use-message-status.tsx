import {
  useUpdateMessageImageMutation,
  useUpdateMessageMutation,
  useUpdateMessageQuery,
} from "@/entities/message-area/queries";
import { v4 as uuidv4 } from "uuid";
import { uploadBase64ToS3 } from "@/shared/api/s3-api";
import { IMessage } from "@/features/message-area/model/types";

const handleQuerySuccess = async (
  message: IMessage,
  data: any,
  update: Function
) => {
  const { images, censored, notFound } = data;

  if (images && !message.image) {
    message.hasError = false;
    message.censored = censored;
    await update(message, images[0]);
  }

  if (notFound && !message.image) {
    message.notFound = true;
    await update(message);
  }
};

const handleQueryError = async (
  message: IMessage,
  error: any,
  update: Function
) => {
  if (error?.response?.status === 404) {
    message.notFound = true;
    await update(message);
  }
};

export const useMessageStatus = (message: IMessage) => {
  const { data, error, isLoading, refetch } = useUpdateMessageQuery(
    message.uuid,
    !message.image && !message.notFound
  );
  const updateMessageMutation = useUpdateMessageMutation(message.uuid);
  const updateMessageImageMutation = useUpdateMessageImageMutation(
    message.uuid
  );

  const update = async (message: IMessage, image?: string) => {
    if (image && !message.image && !updateMessageImageMutation.isPending) {
      const imageName = `${uuidv4()}.png`;
      message.image = `data:image/png;base64,${image}`;
      await updateMessageMutation.mutateAsync(message);
      message.image = await updateMessageImageMutation.mutateAsync({
        image,
        imageName,
      });
    }
    await updateMessageMutation.mutateAsync(message);
  };

  if (data) {
    handleQuerySuccess(message, data, update);
  }

  if (error) {
    handleQueryError(message, error, update);
  }

  return { isLoading, refetch };
};
