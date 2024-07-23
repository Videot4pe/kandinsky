"use client";

import { LegacyRef, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { Message } from "@/features/message-area/ui/message";
import { useMutationObserver } from "@/shared/lib/use-mutation-observer";
import { useMessages } from "@/entities/message-area/queries";
import { IMessage } from "@/features/message-area/model/use-message-status";

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
          {messages.data?.map((message, index) => (
            <Message index={index} uuid={message.uuid} key={message.uuid} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
