"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  IMessage,
  useMessageStatus,
} from "@/features/message-area/model/use-message-status";
import { Brush, RefreshCw, ShieldX } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";
import { queryClient } from "@/shared/api/query-client";
import { useMessage } from "@/features/message-area/model/use-message";

interface MessageProps {
  index: number;
  message: IMessage;
}

export function Message({ index, uuid }: MessageProps) {
  const { data } = useMessage(uuid);
  const message = data;
  const { isLoading, refetch } = useMessageStatus(message);

  if (!message) {
    return;
  }

  const needRetry =
    !message.image && !message.notFound && !message.censored && !isLoading;

  return (
    <motion.div
      key={message.uuid}
      layout
      initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
      animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
      transition={{
        opacity: { duration: 0.1 },
        layout: {
          type: "spring",
          bounce: 0.3,
          duration: index * 0.05 + 0.2,
        },
      }}
      style={{
        originX: 0.5,
        originY: 0.5,
      }}
      className={cn("flex flex-col gap-2 my-4 whitespace-pre-wrap items-start")}
    >
      <div className="flex gap-3 items-center">
        <span className="bg-accent p-3 rounded-md">{message.text}</span>
      </div>
      <div className="flex justify-center w-full">
        {message.censored && (
          <Tooltip>
            <TooltipTrigger>
              <ShieldX className="w-12 h-12 my-6 animate-shake animate-infinite animate-duration-1000 animate-ease-linear" />
            </TooltipTrigger>
            <TooltipContent className="text-red-600">Censored</TooltipContent>
          </Tooltip>
        )}
        {!message.censored && (
          <>
            {isLoading && <Brush className="w-12 h-12 animate-bounce my-6" />}
            {message.image && (
              <a href={message.image} download={message.uuid}>
                <img src={message.image} alt={message.text} />
              </a>
            )}
            {needRetry && (
              <RefreshCw
                className="w-12 h-12 my-6 cursor-pointer"
                onClick={() => refetch()}
              />
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}
