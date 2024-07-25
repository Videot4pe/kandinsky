import { FormEvent } from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/shared/ui/context-menu";
import { DownloadIcon } from "lucide-react";

export function Downloadable({
  image,
  text,
  children,
}: {
  image: string;
  text: string;
  children: React.ReactNode;
}) {
  const handleDownload = (e: FormEvent) => {
    e.stopPropagation();
    const element = document.createElement("a");
    element.setAttribute("href", image);
    element.setAttribute("download", text);
    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem className="cursor-pointer" onClick={handleDownload}>
          Download
          <ContextMenuShortcut>
            <DownloadIcon className="size-4" />
          </ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
