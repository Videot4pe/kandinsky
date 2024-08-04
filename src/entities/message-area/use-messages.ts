import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { getMessages } from "@/shared/api/prisma-api";
import { messageListKey } from "@/entities/message-area/queries";
import { IMessage } from "@/entities/message-area/types";

export function useMessages() {
  return useInfiniteQuery<IMessage[], Error>({
    queryKey: messageListKey,
    queryFn: ({ pageParam = 0 }) => getMessages({ page: pageParam as number }),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return pages.length;
    },
    initialPageParam: 0,
  });
}
