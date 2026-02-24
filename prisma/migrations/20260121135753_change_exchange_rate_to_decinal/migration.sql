/*
  Warnings:

  - You are about to drop the `Plan` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Plan" DROP CONSTRAINT "Plan_customerId_fkey";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "directExchangeRate" SET DATA TYPE DECIMAL(65,30);

-- DropTable
DROP TABLE "public"."Plan";

-- CreateTable
CREATE TABLE "ShipmentPlan" (
    "id" SERIAL NOT NULL,
    "customerId" INTEGER NOT NULL,
    "transportationMode" TEXT NOT NULL DEFAULT 'sea-freight',
    "POReceive" INTEGER NOT NULL,
    "load" INTEGER NOT NULL,
    "transitTime" INTEGER NOT NULL,
    "due" INTEGER NOT NULL,

    CONSTRAINT "ShipmentPlan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ShipmentPlan" ADD CONSTRAINT "ShipmentPlan_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
