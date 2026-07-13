/*
  Warnings:

  - You are about to drop the column `expectedArrival` on the `PurchaseOrder` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PurchaseOrder" DROP COLUMN "expectedArrival",
ADD COLUMN     "ETA" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "loading" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP;
