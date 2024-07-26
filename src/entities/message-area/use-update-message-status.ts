import { useQuery } from "@tanstack/react-query";
import { modelControllerCheckGeneration } from "@/shared/api/fusionbrain-api";
import { messageKey } from "@/entities/message-area/queries";

export function useUpdateMessageStatus(uuid: string, isEnabled: boolean) {
  return useQuery<
    {
      censored?: boolean;
      images?: string[];
      notFound?: boolean;
    },
    { response?: { status?: number } }
  >({
    queryKey: [...messageKey, uuid],
    queryFn: () => modelControllerCheckGeneration(uuid),
    enabled: isEnabled,
    retry: 10,
    retryDelay: 3500,
  });
}
