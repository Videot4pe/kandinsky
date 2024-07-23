import { useMessageQuery } from "@/entities/message-area/queries";

export const useMessage = (uuid: string) => {
  const messageQuery = useMessageQuery(uuid);

  return messageQuery;
};
