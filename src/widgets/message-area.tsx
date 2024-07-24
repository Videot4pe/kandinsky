import { MessageInput, MessageList } from "@/features/message-area";

export function MessageArea({}) {
  return (
    <div className="relative flex min-h-[50dvh] max-h-[calc(100dvh-90px)] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
      <MessageList />
      <MessageInput />
    </div>
  );
}
