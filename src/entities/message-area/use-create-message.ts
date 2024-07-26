import { useMutation } from "@tanstack/react-query";
import { IMessage } from "@/entities/message-area/types";
import { addMessage } from "@/shared/api/prisma-api";
import { getQueryClient } from "@/shared/api/query-client";
import { messageListKey } from "@/entities/message-area/queries";

export function useCreateMessage() {
  return useMutation<IMessage, unknown, IMessage>({
    mutationFn: (message: IMessage) => addMessage(message),
    onSuccess: (newMessage: IMessage) => {
      getQueryClient().setQueryData<IMessage[]>(
        messageListKey,
        (previous: IMessage[] | undefined) =>
          previous ? [...previous, newMessage] : [newMessage]
      );
      getQueryClient().invalidateQueries({
        queryKey: messageListKey,
        exact: true,
        refetchType: "all",
      });
    },
  });
}
