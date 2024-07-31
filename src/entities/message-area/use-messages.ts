import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { getMessages } from "@/shared/api/prisma-api";
import { messageListKey } from "@/entities/message-area/queries";

export function useMessages() {
  return useInfiniteQuery({
    queryKey: messageListKey,
    queryFn: ({ pageParam = 0 }) => getMessages({ page: pageParam }),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return pages.length;
    },
    // placeholderData: keepPreviousData,
  });
}
// export function useMessages(page) {
//   return useQuery({
//     queryKey: [...messageListKey, page],
//     queryFn: () => getMessages({ page }),
//     placeholderData: keepPreviousData,
//   });
// }
