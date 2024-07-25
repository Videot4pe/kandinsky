import { FormEvent } from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/shared/ui/context-menu";
import { Button } from "@/shared/ui/button";
import { DownloadIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { IMessageImage } from "@/entities/images/model/types";

export function ImageModal({
  message,
  handleCloseModal,
}: {
  message: IMessageImage;
  handleCloseModal: () => void;
}) {
  const handleDownload = (e: FormEvent) => {
    e.stopPropagation();
    const element = document.createElement("a");
    element.setAttribute("href", message.image!);
    element.setAttribute("download", message.text);
    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
      onClick={handleCloseModal}
    >
      <div className="flex justify-between items-center mb-4 absolute top-4 right-4">
        <Button
          variant="outline"
          size="icon"
          className="mr-2"
          onClick={handleDownload}
        >
          <DownloadIcon className="h-6 w-6" />
          <span className="sr-only">Download</span>
        </Button>
        <Button variant="outline" size="icon" onClick={handleCloseModal}>
          <XIcon className="h-6 w-6" />
          <span className="sr-only">Close</span>
        </Button>
      </div>
      <ContextMenu>
        <ContextMenuTrigger>
          <div
            className="max-w-[90dvw] max-h-[90dvh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={message.image!}
              width={message.width}
              height={message.height}
              alt="Selected Image"
              className="object-contain max-w-[90dvw] max-h-[90dvh]"
            />
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem
            className="cursor-pointer"
            inset
            onClick={handleDownload}
          >
            Download
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  );
}
