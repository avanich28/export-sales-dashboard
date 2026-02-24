-- CreateTable
CREATE TABLE "public"."Product" (
    "id" SERIAL NOT NULL,
    "code" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "HSCode" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "directExchangeRate" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Customer" (
    "id" SERIAL NOT NULL,
    "customerCompany" TEXT NOT NULL,
    "incoterm" TEXT NOT NULL,
    "portOfLoading" TEXT NOT NULL,
    "creditTerm" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "buyerName" TEXT NOT NULL,
    "buyerEmail" TEXT NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Plan" (
    "id" SERIAL NOT NULL,
    "customerId" INTEGER NOT NULL,
    "POReceive" INTEGER NOT NULL,
    "load" INTEGER NOT NULL,
    "transitTime" INTEGER NOT NULL,
    "due" INTEGER NOT NULL,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Document" (
    "id" SERIAL NOT NULL,
    "customerId" INTEGER NOT NULL,
    "courier" TEXT[],
    "email" TEXT[],
    "driver" TEXT[],

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Contact" (
    "id" SERIAL NOT NULL,
    "customerId" INTEGER NOT NULL,
    "transportationMode" TEXT NOT NULL,
    "freight" TEXT NOT NULL,
    "shipping" TEXT NOT NULL,
    "booking" JSONB NOT NULL,
    "bl" JSONB NOT NULL,
    "exportEntry" JSONB NOT NULL,
    "form" JSONB NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_code_key" ON "public"."Product"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_customerCompany_key" ON "public"."Customer"("customerCompany");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_buyerEmail_key" ON "public"."Customer"("buyerEmail");

-- AddForeignKey
ALTER TABLE "public"."Plan" ADD CONSTRAINT "Plan_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "public"."Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Document" ADD CONSTRAINT "Document_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "public"."Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Contact" ADD CONSTRAINT "Contact_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "public"."Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
