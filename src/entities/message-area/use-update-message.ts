import { v4 as uuidv4 } from "uuid";
import { useMutation } from "@tanstack/react-query/build/modern";
import { IMessage } from "@/entities/message-area/types";
import { messageListKey } from "@/entities/message-area/queries";
import { updateMessage } from "@/shared/api/prisma-api";
import { getQueryClient } from "@/shared/api/query-client";
import { uploadBase64ToS3 } from "@/shared/api/s3-api";

export function useUpdateMessage(uuid: string) {
  return useMutation<IMessage, unknown, IMessage>({
    mutationFn: async (message: IMessage) => {
      if (message.image && message.image?.startsWith("data:image")) {
        const imageName = `${uuidv4()}.png`;
        const rawImage = message.image.replace("data:image/png;base64,", "");
        message.image = await uploadBase64ToS3(rawImage, imageName);
      }
      return updateMessage(uuid, message);
    },
    onMutate: async (newTodo) => {
      await getQueryClient().cancelQueries({ queryKey: messageListKey });
      const previousTodos = getQueryClient().getQueryData(messageListKey);
      getQueryClient().setQueryData(messageListKey, (old) => [...old, newTodo]);
      return { previousTodos };
    },
    onError: (err, newTodo, context) => {
      getQueryClient().setQueryData(messageListKey, context.previousTodos);
    },
    onSettled: () => {
      getQueryClient().invalidateQueries({ queryKey: messageListKey });
    },
  });
}
