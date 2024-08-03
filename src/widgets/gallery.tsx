"use client";

import React, { useRef } from "react";
import { Loader2 } from "lucide-react";
import { MessageImage } from "@/entities/images/ui/message-image";
import { useMessages } from "@/entities/message-area";
import { ScrollArea } from "@/shared/ui/scroll-area";
import InfiniteScroll from "react-infinite-scroll-component";

export function Gallery() {
  const { data, isLoading, isFetching, fetchNextPage, hasNextPage } =
    useMessages();

  const messages = data?.pages?.flat()?.filter(it => !!it.image);

  const handleScroll = () => {
    if (!isLoading && !isFetching) {
      fetchNextPage();
    }
  };

  return (
    <>
      <div id="scrollableDiv" className="h-full" style={{ overflow: "auto" }}>
        <InfiniteScroll
          dataLength={messages?.length ?? 0}
          next={handleScroll}
          hasMore={hasNextPage}
          loader={<></>}
          scrollableTarget="scrollableDiv"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {messages?.map((message) => (
              <MessageImage
                key={message.uuid}
                message={message}
                width={300}
                height={300}
                isLoading={isLoading}
              />
            ))}
          </div>
        </InfiniteScroll>
      </div>
      {isLoading && (
        <div className="flex justify-center items-center h-full">
          <Loader2 className="size-10 animate-spin" />
        </div>
      )}
    </>
  );
}
