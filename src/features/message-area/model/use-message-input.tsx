import {
  useAddUpdateMessageMutation,
  useCreateMessageMutation,
} from "@/entities/message-area/queries";
import React, { FormEvent, useState } from "react";
import { ToastAction } from "@/shared/ui/toast";
import { useToast } from "@/shared/ui/use-toast";
import { useSession } from "next-auth/react";
import { useSettingsStore } from "@/entities/settings/use-settings-store";
import { MessageInputRequest } from "@/features/message-area/model/types";

const createFormData = (data: MessageInputRequest, modelVersion: number) => {
  const formData = new FormData();
  formData.append(
    "params",
    new Blob([JSON.stringify(data)], {
      type: "application/json",
    })
  );
  formData.append("model_id", modelVersion.toString());
  return formData;
};

export function useMessageInput() {
  const createMessageMutation = useCreateMessageMutation();
  const addMessageMutation = useAddUpdateMessageMutation();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();
  const { data: session } = useSession();
  const email = session?.user?.email;

  const store = useSettingsStore();
  const modelVersion = useSettingsStore((state) => state.model);

  const onSubmit = async (e?: FormEvent) => {
    e?.preventDefault();

    const prompt = store.promptPrefix
      ? store.promptPrefix.replace("{prompt}", message)
      : message;

    const request: MessageInputRequest = {
      type: "GENERATE",
      numImages: 1,
      width: store.width,
      height: store.height,
      style: store.style,
      negativePromptUnclip: store.negativePrompt ?? "",
      generateParams: {
        query: prompt,
      },
    };

    try {
      setIsLoading(true);
      const formData = createFormData(request, modelVersion ?? 4);
      const { uuid } = await createMessageMutation.mutateAsync(
        formData as FormData
      );

      const newMessage = {
        uuid,
        userId: email,
        text: message,
        isPending: true,

        width: request.width,
        height: request.height,
        style: request.style,
        negativePrompt: request.negativePromptUnclip,
      };
      await addMessageMutation.mutateAsync(newMessage);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: "There was a problem with your request.",
        action: (
          <ToastAction altText="Try again" onClick={() => onSubmit()}>
            Try again
          </ToastAction>
        ),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    onSubmit,
    message,
    setMessage,
  };
}
