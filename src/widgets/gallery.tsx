"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { getMessages } from "@/shared/api/prisma-api";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useMemo } from "react";

export function Gallery() {
  const { data: messages } = useQuery({
    queryKey: ["gallery"],
    queryFn: () => getMessages(),
  });

  const reversedFilteredMessages = useMemo(
    () => messages?.reverse()?.filter((message) => message.image) ?? [],
    [messages]
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {reversedFilteredMessages.map((message) => (
        <Popover key={message.uuid}>
          <PopoverTrigger asChild>
            <img
              src={message.image}
              alt={message.text}
              width={300}
              height={300}
              className="object-cover w-full rounded-lg overflow-hidden"
            />
          </PopoverTrigger>
          <PopoverContent className="w-auto">
            <img
              src={message.image}
              alt={message.text}
              width={500}
              height={500}
              className="object-cover rounded-lg overflow-hidden"
            />
          </PopoverContent>
        </Popover>
      ))}
    </div>
  );
}
