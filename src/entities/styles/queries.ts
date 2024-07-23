import { useQuery } from "@tanstack/react-query";
import { stylesControllerGetList } from "@/shared/api/fusionbrain-api";

const stylesKey = ["styles"] as unknown[];

export function useStylesQuery() {
  return useQuery({
    queryKey: stylesKey,
    queryFn: stylesControllerGetList,
  });
}
