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

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255),
    "email" VARCHAR(255) NOT NULL,
    "emailVerifiedAt" TIMESTAMP(3),
    "emailVerifToken" VARCHAR(255),
    "password" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
