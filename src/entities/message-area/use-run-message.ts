import { useMutation } from "@tanstack/react-query";
import { modelControllerGenerate } from "@/shared/api/fusionbrain-api";

export function useRunMessage() {
  return useMutation({
    mutationFn: modelControllerGenerate,
  });
}
