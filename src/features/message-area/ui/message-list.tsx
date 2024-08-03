"use client";

import React, { useRef, useState } from "react";
import { Message } from "@/features/message-area/ui/message";
import { useMessages } from "@/entities/message-area";
import { Loader2 } from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";
import {AnimatePresence} from "framer-motion";

export function MessageList() {
  const { data, isLoading, isFetching, fetchNextPage, hasNextPage } =
    useMessages();

  const pages = data?.pages;
  const messages = pages?.flat();

  const handleScroll = () => {
    if (!isLoading && !isFetching) {
      fetchNextPage();
    }
  };

  return (
    <>
      {isLoading && !messages?.length && (
        <div className="flex justify-center h-full">
          <Loader2 className="size-10 animate-spin" />
        </div>
      )}
      <div
        id="scrollableDiv"
        className="h-full"
        style={{
          overflow: "auto",
          display: "flex",
          flexDirection: "column-reverse",
        }}
      >
        <InfiniteScroll
          dataLength={messages?.length ?? 0}
          next={handleScroll}
          style={{ display: "flex", flexDirection: "column-reverse" }}
          loader={
            <></>
            // <div className="flex justify-center h-full">
            // <Loader2 className="size-10 animate-spin" />
            // </div>
          }
          inverse={true}
          hasMore={hasNextPage}
          scrollableTarget="scrollableDiv"
        >
          <AnimatePresence>
            {messages?.map((message, index) => (
              <Message index={index} message={message} key={message.uuid} />
            ))}
          </AnimatePresence>
        </InfiniteScroll>
      </div>
    </>
  );
}
