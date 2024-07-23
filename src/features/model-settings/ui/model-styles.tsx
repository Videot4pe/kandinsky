"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Label } from "@/shared/ui/label";
import { useStyles } from "@/features/model-settings/model/use-styles";
import { useEffect, useState } from "react";
import { useSettingsStore } from "@/entities/settings/use-settings";

export function ModelStyles({}) {
  const { isLoading, items } = useStyles();

  const style = useSettingsStore((state) => state.style);
  const setStyle = useSettingsStore((state) => state.setStyle);

  useEffect(() => {
    if (items?.[0] && !style) {
      setStyle(items[0].name);
    }
  }, [items]);

  return (
    <div className="grid gap-3">
      <Label htmlFor="model">Style {style}</Label>
      <Select
        disabled={isLoading}
        value={style}
        onValueChange={(value) => setStyle(value)}
      >
        <SelectTrigger
          id="model"
          className="items-start [&_[data-description]]:hidden"
        >
          <SelectValue placeholder="Select a model" />
        </SelectTrigger>
        <SelectContent>
          {items.map((item) => (
            <SelectItem value={item.name} key={item.name}>
              {item.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
