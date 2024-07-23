import { useStylesQuery } from "@/entities/styles/queries";

export type Style = {
  name: string;
  title: string;
}

export function useStyles() {
  const stylesQuery = useStylesQuery();
  
  const items = stylesQuery.data ?? [];
  
  return { items, isLoading: stylesQuery.isLoading };
}
