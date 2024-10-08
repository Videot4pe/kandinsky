"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useMessageStatus } from "@/features/message-area/model/use-message-status";
import {Brush, FileX, RefreshCw, ShieldX} from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";
import { IMessage, isMessageImage } from "@/entities/message-area/types";
import Image from "next/image";
import { MessageImage } from "@/entities/images/ui/message-image";
import { IMessageImage } from "@/entities/images/model/types";

interface MessageProps {
  index: number;
  message: IMessage;
}

export function Message({ index, message }: MessageProps) {
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
      initial={{ opacity: 0, scale: 1, y: 1, x: 0 }}
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
        originX: 0,
        originY: 0,
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
        {message.notFound && (
          <Tooltip>
            <TooltipTrigger>
              <FileX className="w-12 h-12 my-6 animate-shake animate-infinite animate-duration-1000 animate-ease-linear" />
            </TooltipTrigger>
            <TooltipContent className="text-red-600">Not found</TooltipContent>
          </Tooltip>
        )}
        {!message.censored && !message.notFound && (
          <>
            {isLoading && <Brush className="w-12 h-12 animate-bounce my-6" />}
            {isMessageImage(message) && (
              <MessageImage
                className="h-[min(512px,calc(100vw-64px))]"
                message={message as IMessageImage}
                isLoading={isLoading}
              />
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
