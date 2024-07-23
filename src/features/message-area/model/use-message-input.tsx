import {
  useAddUpdateMessageMutation,
  useCreateMessageMutation,
} from "@/entities/message-area/queries";
import { ModelDto } from "@/shared/api/fusionbrain-api";
import React, { useState } from "react";
import { IMessage } from "@/features/message-area/model/use-message-status";
import { ToastAction } from "@/shared/ui/toast";
import { useToast } from "@/shared/ui/use-toast";
import { useSession } from "next-auth/react";
import { useSettingsStore } from "@/entities/settings/use-settings-store";

export function useMessageInput() {
  const createMessageMutation = useCreateMessageMutation();
  const addMessageMutation = useAddUpdateMessageMutation();
  const [message, setMessage] = useState("");

  const { toast } = useToast();

  const { data: session } = useSession();
  const email = session?.user?.email;

  const store = useSettingsStore();
  const modelVersion = useSettingsStore((state) => state.model);

  const sendMessage = async (data: ModelDto, modelVersion: string) => {
    const formData = new FormData();
    formData.append(
      "params",
      new Blob([JSON.stringify(data)], {
        type: "application/json",
      })
    );
    formData.append("model_id", modelVersion);
    return createMessageMutation.mutateAsync(formData as FormData);
  };

  const onSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();

    const request: ModelDto = {
      type: "GENERATE",
      numImages: 1,
      width: store.width,
      height: store.height,
      style: store.style,
      negativePromptUnclip: store.negativePrompt,
      generateParams: {
        query: message,
      },
    };

    try {
      const { uuid } = await sendMessage(
        request,
        modelVersion?.toString() ?? "4"
      );
      const newMessage: IMessage = {
        uuid,
        userId: email,
        text: message,
        isPending: true,
      };
      await addMessageMutation.mutateAsync(newMessage);
    } catch (e) {
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
    }
  };

  return {
    isLoading: createMessageMutation.isPending,
    onSubmit,
    message,
    setMessage,
  };
}
