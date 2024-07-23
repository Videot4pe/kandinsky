import { queryClient } from "@/shared/api/query-client";

export async function invalidateOnCreateMessages() {
  await queryClient.invalidateQueries({ queryKey: ["messages"], exact: true });
}

export async function invalidateOnUpdateMessages(message) {
  await queryClient.setQueryData(["messages"], (prev) =>
    prev?.map((item) => (message.uuid !== item.uuid ? item : message))
  );
}
