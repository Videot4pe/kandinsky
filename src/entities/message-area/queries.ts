import { QueryFilters, useMutation, useQuery } from "@tanstack/react-query";
import {
  modelControllerCheckGeneration,
  modelControllerGenerate,
} from "@/shared/api/api";
import {
  addMessage,
  getMessages,
  updateMessage,
} from "@/features/message-area/model/use-message";
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
  return useMutation({
    mutationKey: [...messageKey, uuid],
    mutationFn: (message: IMessage) => updateMessage(uuid, message),
    onSuccess: (newMessage) => {
      queryClient.setQueriesData(messageListKey as QueryFilters, (previous) =>
        previous.map((message) =>
          message.uuid === newMessage.uuid ? newMessage : message
        )
      );
      // queryClient.invalidateQueries(messageListKey, {
      //   exact: true,
      //   refetchActive: false,
      // });
    },
  });
}

export function useAddUpdateMessageMutation() {
  return useMutation({
    mutationKey: [...messageKey],
    mutationFn: (message: IMessage) => addMessage(message),
    onSuccess: (newMessage) => {
      queryClient.setQueriesData(messageListKey as QueryFilters, (previous) => [
        ...previous,
        newMessage,
      ]);
      // queryClient.invalidateQueries(messageListKey, {
      //   exact: true,
      //   refetchActive: false,
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
  return useQuery({
    queryKey: [...messageKey, uuid],
    queryFn: () => modelControllerCheckGeneration(uuid),
    enabled: isEnabled,
    retry: 10,
    retryDelay: 2500,
  });
}
