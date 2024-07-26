"use client";

import Image from "next/image";
import React, { useState } from "react";
import moment from "moment";
import { ImageModal } from "@/entities/images/ui/image-modal";
import { Loader2 } from "lucide-react";
import { Downloadable } from "@/shared/ui/downloadable";
import { IMessageImage } from "@/entities/images/model/types";

export function MessageImage({
  message,
  width,
  height,
  isLoading,
}: {
  message: IMessageImage;
  width?: number;
  height?: number;
  isLoading: boolean;
}) {
  const [selectedMessage, setSelectedMessage] = useState<
    IMessageImage | undefined
  >();
  const handleImageClick = (message: IMessageImage) => {
    setSelectedMessage(message);
  };
  const handleCloseModal = () => {
    setSelectedMessage(undefined);
  };

  return (
    <>
      {isLoading && (
        <div className="flex justify-center items-center h-full">
          <Loader2 className="size-10 animate-spin" />
        </div>
      )}
      <div
        className="relative group overflow-hidden rounded-lg cursor-pointer"
        onClick={() => handleImageClick(message)}
      >
        <Downloadable image={message.image!} text={message.text}>
          <Image
            src={message.image}
            width={width ?? message.width}
            height={height ?? message.height}
            alt={message.text}
            className="object-cover w-full rounded-lg transition-all duration-300 group-hover:scale-110 max-w-[512px]"
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h3 className="text-xl font-bold mb-2">{message.style}</h3>
            <p className="text-sm mb-2">{message.text}</p>
            <p className="text-sm">
              {moment(message.createdAt).format("DD.MM.YYYY HH:mm")}
            </p>
          </div>
        </Downloadable>
      </div>
      {selectedMessage && (
        <ImageModal
          message={selectedMessage}
          handleCloseModal={handleCloseModal}
        />
      )}
    </>
  );
}
