import { v4 as uuidv4 } from "uuid";
import { useMutation } from "@tanstack/react-query";
import { IMessage } from "@/entities/message-area/types";
import { messageListKey } from "@/entities/message-area/queries";
import { updateMessage } from "@/shared/api/prisma/messages-api";
import { getQueryClient } from "@/shared/api/query-client";
import { uploadBase64ToS3 } from "@/shared/api/s3-api";

type IContext = {
  previousMessages: IMessage[];
};

interface MessagesPage {
  pages: IMessage[][];
  pageParams: any[];
}

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
    onMutate: async (newMessage: IMessage) => {
      await getQueryClient().cancelQueries({ queryKey: messageListKey });
      const previousData =
        getQueryClient().getQueryData<MessagesPage>(messageListKey);
      const previousMessages = previousData?.pages.flat() || [];

      if (
        previousData &&
        !previousData.pages[0].some((m) => m.uuid === newMessage.uuid)
      ) {
        getQueryClient().setQueryData<MessagesPage>(messageListKey, (data) => {
          if (!data) return data;

          const firstPage = data.pages[0];
          const index = firstPage.findIndex((m) => m.uuid === newMessage.uuid);

          if (index !== -1) {
            firstPage[index] = newMessage;
          }

          const pages = data.pages;
          pages[0] = firstPage;

          return {
            pages: pages,
            pageParams: data.pageParams,
          } as MessagesPage;
        });
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
