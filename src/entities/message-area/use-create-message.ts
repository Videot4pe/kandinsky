import { useMutation } from "@tanstack/react-query";
import { IMessage } from "@/entities/message-area/types";
import { addMessage } from "@/shared/api/prisma-api";
import { getQueryClient } from "@/shared/api/query-client";
import { messageListKey } from "@/entities/message-area/queries";

export function useCreateMessage() {
  return useMutation<IMessage, unknown, IMessage>({
    mutationFn: (message: IMessage) => addMessage(message),
    onSuccess: (newMessage: IMessage) => {
      getQueryClient().setQueryData<IMessage[]>(messageListKey, (data) => {
        const firstPage = data?.pages[0];
        // firstPage.push(newMessage);
        firstPage.unshift(newMessage);
        const pages = data?.pages;
        pages[0] = firstPage;

        return {
          pages: pages,
          pageParams: data.pageParams,
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
