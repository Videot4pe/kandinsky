import { useQuery } from "@tanstack/react-query";
import { stylesControllerGetList } from "@/shared/api/api";

const stylesKey = ["styles"] as unknown[];

export function useStylesQuery() {
  return useQuery({
    queryKey: stylesKey,
    queryFn: stylesControllerGetList,
    // keepPreviousData: true,
  });
}