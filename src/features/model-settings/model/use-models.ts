import {useModelsQuery} from "@/entities/models/queries";

export type ModelVersion = {
  id: number;
  name: string;
  version: string;
}

export function useModels() {
  const modelsQuery = useModelsQuery();
  
  const items = modelsQuery.data ?? [];
  
  return { items, isLoading: modelsQuery.isLoading };
}
