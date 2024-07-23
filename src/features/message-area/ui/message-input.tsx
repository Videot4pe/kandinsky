"use client";

import { Label } from "@/shared/ui/label";
import { Textarea } from "@/shared/ui/textarea";
import { Button } from "@/shared/ui/button";
import { CornerDownLeft, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useSettingsStore } from "@/entities/settings/use-settings";
import { ModelDto } from "@/shared/api/api";
import { useMessageInput } from "@/features/message-area/model/use-message-input";
import { useToast } from "@/shared/ui/use-toast";
import { ToastAction } from "@/shared/ui/toast";
import { useSession } from "next-auth/react";
import { useAddUpdateMessageMutation } from "@/entities/message-area/queries";
import { IMessage } from "@/features/message-area/model/use-message-status";

const MAX_LENGTH = 1000;

export function MessageInput({}) {
  const [message, setMessage] = useState("");
  const addMessageMutation = useAddUpdateMessageMutation();
  const { isLoading, sendMessage } = useMessageInput();
  const { toast } = useToast();

  const { data: session } = useSession();
  const email = session?.user?.email;

  const store = useSettingsStore();
  // TODO FIX!!!
  const modelVersion = useSettingsStore((state) => state.model);

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

  const onSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
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

  return (
    <form
      className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring min-h-32"
      onSubmit={onSubmit}
    >
      <Label htmlFor="message" className="sr-only">
        Message
      </Label>
      <Textarea
        value={message}
        onInput={(event) => setMessage(event.currentTarget.value)}
        id="message"
        maxLength={MAX_LENGTH}
        placeholder="Type your request..."
        className="resize-none border-0 p-3 shadow-none focus-visible:ring-0"
      />
      <div className="flex items-center p-3 pt-0">
        <Button
          disabled={!message || isLoading}
          type="submit"
          size="sm"
          className="ml-auto gap-1.5"
        >
          Send Message
          {isLoading && <Loader2 className="size-3.5 animate-spin" />}
          {!isLoading && <CornerDownLeft className="size-3.5" />}
        </Button>
      </div>
    </form>
  );
}
