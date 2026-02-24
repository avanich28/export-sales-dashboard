/*
  Warnings:

  - You are about to drop the column `bl` on the `Contact` table. All the data in the column will be lost.
  - Added the required column `blOrAwb` to the `Contact` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "bl",
ADD COLUMN     "blOrAwb" JSONB NOT NULL;
