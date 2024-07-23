import { useQuery } from "@tanstack/react-query";
import { modelControllerGetModels } from "@/shared/api/fusionbrain-api";

const modelsKey = ["models"] as unknown[];

export function useModelsQuery() {
  return useQuery({
    queryKey: modelsKey,
    queryFn: modelControllerGetModels,
  });
}
