import { queryClient } from "@/shared/api/query-client";

export async function invalidateOnCreateMessages() {
  await queryClient.invalidateQueries({ queryKey: ["messages"], exact: true });
}
