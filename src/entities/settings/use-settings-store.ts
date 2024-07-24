import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  width: number;
  height: number;
  negativePrompt?: string;
  promptPrefix?: string;
  style: string;
  model?: number;
}

interface Actions {
  setWidth: (width: number) => void;
  setHeight: (height: number) => void;
  setNegativePrompt: (negativePrompt?: string) => void;
  setPromptPrefix: (promptPrefix?: string) => void;
  setStyle: (style: string) => void;
  setModel: (model?: number) => void;
}

const INITIAL_STATE: State = {
  width: 1024,
  height: 1024,
  negativePrompt: undefined,
  promptPrefix: undefined,
  style: "DEFAULT",
  model: undefined,
};

export const useSettingsStore = create<
  State & Actions,
  [["zustand/persist", State]]
>(
  persist(
    (set) => ({
      ...INITIAL_STATE,
      setWidth: (width: number) => set({ width }),
      setHeight: (height: number) => set({ height }),
      setNegativePrompt: (negativePrompt?: string) => set({ negativePrompt }),
      setPromptPrefix: (promptPrefix?: string) => set({ promptPrefix }),
      setStyle: (style) => {
        set({ style });
      },
      setModel: (model?: number) => set({ model }),
    }),
    {
      name: "model-settings-storage",
    }
  )
);
