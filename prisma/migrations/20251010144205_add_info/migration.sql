/*
  Warnings:

  - You are about to drop the column `portOfLoading` on the `Customer` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[image]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `portOfUnload` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Customer" DROP COLUMN "portOfLoading",
ADD COLUMN     "portOfUnload" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Product" ADD COLUMN     "image" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Product_image_key" ON "public"."Product"("image");
