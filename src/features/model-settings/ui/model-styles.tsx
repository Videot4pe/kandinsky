"use client";

import { Label } from "@/shared/ui/label";
import { useCallback, useEffect } from "react";
import { useSettingsStore } from "@/entities/settings/use-settings-store";
import { ModelStylesCombobox } from "@/features/model-settings/ui/model-styles-combobox";
import { useStyles } from "@/features/model-settings/model/use-styles";

export function ModelStyles({ platform }: { platform?: string }) {
  const { comboboxItems, comboboxGroupItems } = useStyles();

  const style = useSettingsStore((state) => state.style);
  const setStyle = useSettingsStore((state) => state.setStyle);
  const setNegativePrompt = useSettingsStore(
    (state) => state.setNegativePrompt
  );
  const setPromptPrefix = useSettingsStore((state) => state.setPromptPrefix);

  const setPreset = useCallback(
    (presetName: string) => {
      const preset = comboboxItems.find(
        (p) => p.name.toLowerCase() === presetName.toLowerCase()
      );
      if (!preset) {
        return;
      }

      setStyle(preset.name);
      setNegativePrompt(preset.negative_prompt);
      setPromptPrefix(preset.prompt);
    },
    [comboboxItems, setNegativePrompt, setPromptPrefix, setStyle]
  );

  useEffect(() => {
    if (comboboxItems.length && !style) {
      const initialPreset = comboboxItems[0].value ?? "No style";
      setPreset(initialPreset);
    }
  }, [comboboxItems, style, setStyle, setPreset]);

  return (
    <div id={`${platform}-model-styles`} className="grid gap-3">
      <Label htmlFor="model">Style</Label>
      <ModelStylesCombobox
        value={style}
        setValue={(value) => setPreset(value)}
        items={comboboxItems}
        groupedItems={comboboxGroupItems}
      />
    </div>
  );
}
