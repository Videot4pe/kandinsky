import { useMutation, useQuery } from "@tanstack/react-query";
import {
  modelControllerCheckGeneration,
  modelControllerGenerate,
} from "@/shared/api/fusionbrain-api";
import {
  addMessage,
  getMessages,
  getMessage,
  updateMessage,
} from "@/shared/api/prisma-api";
import { queryClient } from "@/shared/api/query-client";
import { IMessage } from "@/features/message-area/model/use-message-status";

const messageKey = ["message"] as string[];
const messageListKey = ["messages"] as string[];

export function useCreateMessageMutation() {
  return useMutation({
    mutationKey: messageKey,
    mutationFn: modelControllerGenerate,
  });
}

export function useUpdateMessageMutation(uuid: string) {
  return useMutation<IMessage, unknown, IMessage>({
    mutationKey: [...messageKey, uuid],
    mutationFn: (message: IMessage) => updateMessage(uuid, message),
    onSuccess: (newMessage: IMessage) => {
      queryClient.setQueryData<IMessage[]>(
        messageListKey,
        (previous: IMessage[] | undefined) =>
          previous
            ? previous.map((message) =>
                message.uuid === newMessage.uuid ? newMessage : message
              )
            : []
      );
      // queryClient.setQueryData<IMessage>(
      //   [...messageListKey, uuid],
      //   () => newMessage
      // );
      // queryClient.invalidateQueries({
      //   queryKey: messageListKey,
      //   exact: true,
      //   refetchType: "all",
      // });
    },
  });
}

export function useAddUpdateMessageMutation() {
  return useMutation<IMessage, unknown, IMessage>({
    mutationKey: [...messageListKey],
    mutationFn: (message: IMessage) => addMessage(message),
    onSuccess: (newMessage: IMessage) => {
      console.log("new: ", newMessage);
      queryClient.setQueryData<IMessage[]>(
        messageListKey,
        (previous: IMessage[] | undefined) =>
          previous ? [...previous, newMessage] : [newMessage]
      );
      // queryClient.invalidateQueries({
      //   queryKey: messageListKey,
      //   exact: true,
      //   refetchType: "all",
      // });
    },
  });
}

export function useMessages() {
  return useQuery({
    queryKey: messageListKey,
    queryFn: () => getMessages(),
  });
}

export function useUpdateMessageQuery(uuid: string, isEnabled: boolean) {
  return useQuery<
    {
      censored?: boolean;
      images?: string[];
      notFound?: boolean;
    },
    { response?: { status?: number } }
  >({
    queryKey: [...messageKey, uuid],
    queryFn: () => modelControllerCheckGeneration(uuid),
    enabled: isEnabled,
    retry: 10,
    retryDelay: 3500,
  });
}

export function useMessageQuery(uuid: string) {
  return useQuery<IMessage>({
    queryKey: [...messageListKey, uuid],
    queryFn: () => getMessage(uuid),
    initialData: () => {
      return (queryClient.getQueryData(messageListKey) as IMessage[]).find(
        (message) => message.uuid === uuid
      );
    },
  });
}
