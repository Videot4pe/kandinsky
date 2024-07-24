-- CreateTable
CREATE TABLE "Message" (
    "uuid" TEXT NOT NULL,
    "userId" TEXT,
    "image" TEXT,
    "text" TEXT NOT NULL,
    "isPending" BOOLEAN NOT NULL DEFAULT false,
    "notFound" BOOLEAN NOT NULL DEFAULT false,
    "hasError" BOOLEAN NOT NULL DEFAULT false,
    "censored" BOOLEAN NOT NULL DEFAULT false,
    "url" TEXT,
    "width" INTEGER,
    "height" INTEGER,
    "style" TEXT,
    "negativePrompt" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("uuid")
);
