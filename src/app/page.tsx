import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/ui/drawer";
import { Button } from "@/shared/ui/button";
import { Settings } from "lucide-react";
import { MobileModelSettings, ModelSettings } from "@/widgets/model-settings";
import { MessageArea } from "@/widgets/message-area";
import { Header } from "@/app/header";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export default function HomePage() {
  return (
    <div className="h-[100dvh] w-full flex flex-col">
      <Header>
        <MobileModelSettings />
      </Header>
      <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
        <ModelSettings className="hidden md:block" />
        <MessageArea />
      </main>
    </div>
  );
}
