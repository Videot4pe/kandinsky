"use client";

import { getMessages } from "@/shared/api/prisma-api";
import { useQuery } from "@tanstack/react-query";
import React, { useMemo, useState } from "react";
import { ImageModal } from "@/entities/images/ui/image-modal";
import { Loader2 } from "lucide-react";
import { MessageImage } from "@/entities/images/ui/message-image";
import { IMessageImage } from "@/entities/images/model/types";
import { isMessageImage } from "@/entities/message-area/types";

export function Gallery() {
  const { data: messages, isLoading } = useQuery({
    queryKey: ["gallery"],
    queryFn: () => getMessages("desc"),
  });

  const filteredMessages = useMemo(
    () =>
      (messages?.filter(
        (message) => message.image ?? isMessageImage(message)
      ) ?? []) as IMessageImage[],
    [messages]
  );

  return (
    <>
      {isLoading && (
        <div className="flex justify-center items-center h-full">
          <Loader2 className="size-10 animate-spin" />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredMessages.map((message) => (
          <MessageImage
            key={message.uuid}
            message={message}
            width={300}
            height={300}
            isLoading={isLoading}
          />
        ))}
      </div>
    </>
  );
}
