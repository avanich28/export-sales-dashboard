/*
  Warnings:

  - You are about to alter the column `directExchangeRate` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,4)`.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "directExchangeRate" SET DEFAULT 0,
ALTER COLUMN "directExchangeRate" SET DATA TYPE DECIMAL(10,4);
