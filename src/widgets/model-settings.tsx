"use client";

import {
  ImageSize,
  ModelStyles,
  NegativePrompt,
} from "@/features/model-settings";
import { ModelVersion } from "@/features/model-settings/ui/model-version";
import { clsx } from "clsx";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/ui/drawer";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button } from "@/shared/ui/button";
import { CircleHelp, Settings } from "lucide-react";
import { driverTour } from "@/shared/lib/driver";

export function ModelSettings({ className }: { className?: string }) {
  return (
    <div className={clsx("relative flex-col items-start gap-8", className)}>
      <form className="grid w-full items-start gap-6">
        <fieldset className="grid gap-6 rounded-lg border p-4">
          <legend className="-ml-1 px-1 text-sm font-medium hidden md:flex">
            Settings
            <CircleHelp
              className="size-4 self-center ml-2 cursor-pointer"
              onClick={() => driverTour.drive()}
            />
          </legend>
          <ModelStyles />
          <ModelVersion />
          <ImageSize />
          <NegativePrompt />
        </fieldset>
      </form>
    </div>
  );
}

export function MobileModelSettings() {
  return (
    <>
      <Drawer>
        <DrawerTitle>
          <VisuallyHidden>Settings</VisuallyHidden>
        </DrawerTitle>
        <DrawerTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Settings className="size-4" />
            <span className="sr-only">Settings</span>
          </Button>
        </DrawerTrigger>
        <DrawerContent className="max-h-[80dvh]">
          <DrawerHeader>
            <DrawerDescription className="flex justify-center">
              Settings
              <CircleHelp
                className="size-4 self-center ml-2 cursor-pointer"
                onClick={() => driverTour.drive()}
              />
            </DrawerDescription>
          </DrawerHeader>
          <ModelSettings />
        </DrawerContent>
      </Drawer>
    </>
  );
}
