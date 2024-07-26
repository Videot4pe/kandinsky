"use client";

import React from "react";
import { Label } from "@/shared/ui/label";
import { Textarea } from "@/shared/ui/textarea";
import { Button } from "@/shared/ui/button";
import { CornerDownLeft, Loader2 } from "lucide-react";
import { useMessageInput } from "@/features/message-area/model/use-message-input";

const MAX_LENGTH = 1000;

export function MessageInput() {
  const { isLoading, onSubmit, message, setMessage } = useMessageInput();

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
        onKeyDown={(e) => {
          if (e.keyCode === 13 && !e.shiftKey) {
            onSubmit(e);
          }
        }}
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
