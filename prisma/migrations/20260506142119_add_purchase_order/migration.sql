-- CreateTable
CREATE TABLE "PurchaseOrder" (
    "id" SERIAL NOT NULL,
    "purchaseOrderNumber" TEXT NOT NULL,
    "customerId" INTEGER NOT NULL,
    "portOfUnload" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "expectedArrival" TIMESTAMP(3) NOT NULL,
    "note" TEXT NOT NULL,
    "items" JSONB NOT NULL,

    CONSTRAINT "PurchaseOrder_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PurchaseOrder" ADD CONSTRAINT "PurchaseOrder_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
