import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Label } from "@/shared/ui/label";
import { useEffect, useState } from "react";
import { useSettingsStore } from "@/entities/settings/use-settings-store";
import { useModels } from "@/features/model-settings/model/use-models";

export function ModelVersion({}) {
  const { isLoading, items } = useModels();

  const model = useSettingsStore((state) => state.model);
  const setModel = useSettingsStore((state) => state.setModel);

  useEffect(() => {
    if (items?.[0] && !model) {
      setModel(items[0].id);
    }
  }, [items]);

  return (
    <div id="model-version" className="grid gap-3">
      <Label htmlFor="model">Model version</Label>
      <Select
        disabled={isLoading}
        value={model?.toString()}
        onValueChange={(value) => setModel(+value)}
      >
        <SelectTrigger
          id="model"
          className="items-start [&_[data-description]]:hidden"
        >
          <SelectValue placeholder="Select a version" />
        </SelectTrigger>
        <SelectContent>
          {items.map((item) => (
            <SelectItem value={item.id.toString()} key={item.name}>
              {item.name} {item.version}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
