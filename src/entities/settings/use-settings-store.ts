import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  width: number;
  height: number;
  negativePrompt: string;
  style: string;
  model?: number;
}

interface Actions {
  setWidth: (width: number) => void;
  setHeight: (height: number) => void;
  setNegativePrompt: (negativePrompt: string) => void;
  setStyle: (style: string) => void;
  setModel: (model?: number) => void;
}

const INITIAL_STATE: State = {
  width: 1024,
  height: 1024,
  negativePrompt: "",
  style: "",
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
      setNegativePrompt: (negativePrompt: string) => set({ negativePrompt }),
      setStyle: (style: string) => set({ style }),
      setModel: (model?: number) => set({ model }),
    }),
    {
      name: "model-settings-storage",
    }
  )
);
