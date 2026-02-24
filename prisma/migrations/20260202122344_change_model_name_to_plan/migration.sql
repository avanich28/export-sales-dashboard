/*
  Warnings:

  - You are about to drop the `ShipmentPlan` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."ShipmentPlan" DROP CONSTRAINT "ShipmentPlan_customerId_fkey";

-- DropTable
DROP TABLE "public"."ShipmentPlan";

-- CreateTable
CREATE TABLE "Plan" (
    "id" SERIAL NOT NULL,
    "customerId" INTEGER NOT NULL,
    "transportationMode" TEXT NOT NULL DEFAULT 'sea-freight',
    "POReceive" INTEGER NOT NULL,
    "load" INTEGER NOT NULL,
    "transitTime" INTEGER NOT NULL,
    "due" INTEGER NOT NULL,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Plan" ADD CONSTRAINT "Plan_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
