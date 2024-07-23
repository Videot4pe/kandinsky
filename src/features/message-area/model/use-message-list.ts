import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IMessage } from "@/features/message-area/model/use-message-status";

interface MessageStore {
  messages: IMessage[];
  addMessage: (message: IMessage) => void;
  updateMessage: (message: IMessage) => void;
}

export const useMessageList = create<
  MessageStore,
  [["zustand/persist", { messages: IMessage[] }]]
>(
  persist(
    (set) => ({
      messages: [],
      addMessage: (message: IMessage) =>
        set((state) => ({
          messages: [...state.messages, message],
        })),
      updateMessage: (message: IMessage) =>
        set((state) => {
          const localMessages = [...state.messages];
          const messageIndex = state.messages.findIndex(
            (existingMessage) => existingMessage.uuid === message.uuid
          );
          localMessages[messageIndex] = message;
          return {
            messages: localMessages,
          };
        }),
    }),
    {
      name: "messages-storage",
    }
  )
);
