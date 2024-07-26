import { v4 as uuidv4 } from "uuid";
import { useMutation } from "@tanstack/react-query";
import { IMessage } from "@/entities/message-area/types";
import { messageListKey } from "@/entities/message-area/queries";
import { updateMessage } from "@/shared/api/prisma-api";
import { getQueryClient } from "@/shared/api/query-client";
import { uploadBase64ToS3 } from "@/shared/api/s3-api";

type IContext = {
  previousMessages: IMessage[];
};

export function useUpdateMessage(uuid: string) {
  return useMutation<IMessage, unknown, IMessage, IContext>({
    mutationFn: async (message: IMessage) => {
      if (message.image && message.image?.startsWith("data:image")) {
        const imageName = `${uuidv4()}.png`;
        const rawImage = message.image.replace("data:image/png;base64,", "");
        message.image = await uploadBase64ToS3(rawImage, imageName);
      }
      return updateMessage(uuid, message);
    },
    onMutate: async (newMessage) => {
      await getQueryClient().cancelQueries({ queryKey: messageListKey });
      const previousMessages = getQueryClient().getQueryData(messageListKey);
      if (!previousMessages.some((m) => m.uuid === newMessage.uuid)) {
        getQueryClient().setQueryData(messageListKey, (old: IMessage[]) => [
          ...old,
          newMessage,
        ]);
      }
      return { previousMessages } as IContext;
    },
    onError: (err, newMessage, context: IContext | undefined) => {
      if (context && context.previousMessages) {
        getQueryClient().setQueryData(messageListKey, context.previousMessages);
      }
    },
    onSettled: () => {
      getQueryClient().invalidateQueries({ queryKey: messageListKey });
    },
  });
}
