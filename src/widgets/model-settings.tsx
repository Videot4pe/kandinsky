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
import { Settings } from "lucide-react";
import { DriverButton } from "@/features/driver/ui/driver-button";
import { ReactNode } from "react";

export function ModelSettings({
  className,
  platform,
  children,
}: {
  className?: string;
  platform: "desktop" | "mobile";
  children?: ReactNode;
}) {
  return (
    <div className={clsx("relative flex-col items-start gap-8", className)}>
      <form className="grid w-full items-start gap-6">
        <fieldset className="grid gap-6 rounded-lg border p-4">
          <legend className="-ml-1 px-1 text-sm font-medium hidden md:flex">
            Settings
            {children}
          </legend>
          <ModelStyles platform={platform} />
          <ModelVersion platform={platform} />
          <ImageSize platform={platform} />
          <NegativePrompt platform={platform} />
        </fieldset>
      </form>
    </div>
  );
}

export function DesktopModelSettings({ className }: { className?: string }) {
  return (
    <ModelSettings platform="desktop" className={className}>
      <DriverButton platform="desktop" />
    </ModelSettings>
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
          <Button
            id="mobile-settings-button"
            variant="ghost"
            size="icon"
            className="md:hidden"
          >
            <Settings className="size-4" />
            <span className="sr-only">Settings</span>
          </Button>
        </DrawerTrigger>
        <DrawerContent className="max-h-[80dvh]">
          <DrawerHeader>
            <DrawerDescription className="flex justify-center">
              Settings
            </DrawerDescription>
          </DrawerHeader>
          <ModelSettings platform="mobile" />
        </DrawerContent>
      </Drawer>
    </>
  );
}
