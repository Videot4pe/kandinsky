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
import { getQueryClient } from "@/shared/api/query-client";
import { IMessage } from "@/entities/message-area/types";
import { uploadBase64ToS3 } from "@/shared/api/s3-api";

const messageKey = ["message"] as string[];
const messageListKey = ["messages"] as string[];

interface ImageData {
  image: string;
  imageName: string;
}

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
      getQueryClient().setQueryData<IMessage[]>(
        messageListKey,
        (previous: IMessage[] | undefined) =>
          previous
            ? previous.map((msg) =>
                msg.uuid === newMessage.uuid ? newMessage : msg
              )
            : []
      );
    },
  });
}

export function useUpdateMessageImageMutation(uuid: string) {
  const mutationKey = [...messageKey, uuid];
  const mutationFn = async ({ image, imageName }: ImageData) =>
    await uploadBase64ToS3(image, imageName);
  return useMutation<string, unknown, ImageData>({
    mutationKey,
    mutationFn,
  });
}

export function useAddUpdateMessageMutation() {
  return useMutation<IMessage, unknown, IMessage>({
    mutationKey: [...messageListKey],
    mutationFn: (message: IMessage) => addMessage(message),
    onSuccess: (newMessage: IMessage) => {
      getQueryClient().setQueryData<IMessage[]>(
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
