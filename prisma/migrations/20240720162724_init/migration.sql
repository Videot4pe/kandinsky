/*
  Warnings:

  - Added the required column `uuid` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "uuid" TEXT NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL;
