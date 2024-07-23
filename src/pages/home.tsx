import { Settings } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/shared/ui/drawer";
import { MessageArea } from "@/widgets/message-area";
import { ModelSettings } from "@/widgets/model-settings";
import { SignBtn } from "@/features/auth/ui/sign-btn";

export function HomePage() {
  return (
    <div className="h-[100dvh] w-full flex flex-col">
      <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
        <div className="w-full flex justify-between">
          <div className="flex">
            <h1 className="text-xl font-semibold self-center">Kandinsky</h1>
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Settings className="size-4" />
                  <span className="sr-only">Settings</span>
                </Button>
              </DrawerTrigger>
              <DrawerContent className="max-h-[80vh]">
                <ModelSettings />
              </DrawerContent>
            </Drawer>
          </div>
          <SignBtn />
        </div>
      </header>
      <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
        <ModelSettings className="hidden md:block" />
        <MessageArea />
      </main>
    </div>
  );
}
