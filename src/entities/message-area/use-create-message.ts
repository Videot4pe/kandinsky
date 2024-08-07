import { useMutation } from "@tanstack/react-query";
import { IMessage } from "@/entities/message-area/types";
import { createMessage } from "@/shared/api/prisma/messages-api";
import { getQueryClient } from "@/shared/api/query-client";
import { messageListKey } from "@/entities/message-area/queries";

export function useCreateMessage() {
  return useMutation<IMessage, unknown, IMessage>({
    mutationFn: (message: IMessage) => createMessage(message),
    onSuccess: (newMessage: IMessage) => {
      getQueryClient().setQueryData(messageListKey, (data: any) => {
        if (!data) return { pages: [[newMessage]], pageParams: [] };

        const pages = data.pages.map((page: IMessage[]) => [...page]);
        pages[0].unshift(newMessage);

        return {
          ...data,
          pages,
        };
      });

      getQueryClient().invalidateQueries({
        queryKey: messageListKey,
        exact: true,
        refetchType: "all",
      });
    },
  });
}
