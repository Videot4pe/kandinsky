"use client";

import {
  ImageSize,
  ModelStyles,
  NegativePrompt,
} from "@/features/model-settings";
import { ModelVersion } from "@/features/model-settings/ui/model-version";
import { clsx } from "clsx";

export function ModelSettings({ className }: { className?: string }) {
  return (
    <div className={clsx("relative flex-col items-start gap-8", className)}>
      <form className="grid w-full items-start gap-6">
        <fieldset className="grid gap-6 rounded-lg border p-4">
          <legend className="-ml-1 px-1 text-sm font-medium">Settings</legend>
          <ModelStyles />
          <ModelVersion />
          <ImageSize />
          <NegativePrompt />
        </fieldset>
      </form>
    </div>
  );
}
