"use client";

import { getDriver } from "@/shared/lib/driver";
import { CircleHelp } from "lucide-react";
import { useWindowDimensions } from "@/shared/lib/use-window-dimensions";

export function DriverButton({
  platform = "desktop",
}: {
  platform: "mobile" | "desktop";
}) {
  const { isMobile } = useWindowDimensions();
  const driver = getDriver(isMobile);

  if (
    (isMobile && platform === "mobile") ||
    (!isMobile && platform === "desktop")
  ) {
    return (
      <>
        <CircleHelp
          className="size-4 self-center ml-2 cursor-pointer"
          onClick={() => driver.drive()}
        />
      </>
    );
  }

  return <></>;
}
