-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "censored" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasError" BOOLEAN NOT NULL DEFAULT false;
