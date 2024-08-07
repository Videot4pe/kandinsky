import {
  DesktopModelSettings,
  MobileModelSettings,
} from "@/widgets/model-settings";
import { MessageArea } from "@/widgets/message-area";
import { Header } from "@/app/header";
import { DriverButton } from "@/features/driver/ui/driver-button";

export default function HomePage() {
  return (
    <div id="kandinsky" className="h-[100dvh] w-full flex flex-col">
      <Header>
        <MobileModelSettings />
        <DriverButton platform="mobile" />
      </Header>
      <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
        <DesktopModelSettings className="hidden md:block" />
        <MessageArea />
      </main>
    </div>
  );
}
