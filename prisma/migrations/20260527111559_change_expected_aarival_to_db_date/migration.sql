/*
  Warnings:

  - Changed the type of `expectedArrival` on the `PurchaseOrder` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "PurchaseOrder" DROP COLUMN "expectedArrival",
ADD COLUMN     "expectedArrival" DATE NOT NULL;
