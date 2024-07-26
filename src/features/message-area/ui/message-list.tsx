"use client";

import React, { LegacyRef, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { Message } from "@/features/message-area/ui/message";
import { useMutationObserver } from "@/shared/lib/use-mutation-observer";
import { useMessages } from "@/entities/message-area";
import { Loader2 } from "lucide-react";

export function MessageList() {
  const messages = useMessages();
  const messagesContainerRef = useRef<HTMLDivElement>();

  const scrollBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  };

  useEffect(() => {
    scrollBottom();
  }, []);
  useMutationObserver(messagesContainerRef, scrollBottom);

  return (
    <div className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col scrollbar-hide">
      <div ref={messagesContainerRef as LegacyRef<HTMLDivElement>}>
        <AnimatePresence>
          {messages.isLoading && (
            <div className="flex justify-center h-full">
              <Loader2 className="size-10 animate-spin" />
            </div>
          )}
          {messages.data?.map((message, index) => (
            <Message index={index} message={message} key={message.uuid} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
