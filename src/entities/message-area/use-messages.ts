import { useQuery } from "@tanstack/react-query";
import { getMessages } from "@/shared/api/prisma-api";
import { messageListKey } from "@/entities/message-area/queries";

export function useMessages() {
  return useQuery({
    queryKey: messageListKey,
    queryFn: () => getMessages(),
  });
}
