import { useCreateMessageMutation } from "@/entities/message-area/queries";
import { ModelDto } from "@/shared/api/api";

export function useMessageInput() {
  const createMessageMutation = useCreateMessageMutation();

  const sendMessage = async (data: ModelDto, modelVersion: string) => {
    const formData = new FormData();
    formData.append(
      "params",
      new Blob([JSON.stringify(data)], {
        type: "application/json",
      })
    );
    formData.append("model_id", modelVersion);
    return createMessageMutation.mutateAsync(formData);
  };

  return {
    isLoading: createMessageMutation.isPending,
    sendMessage,
  };
}
