-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('Man', 'Woman');

-- CreateTable
CREATE TABLE "Resident" (
    "id" TEXT NOT NULL,
    "f_name" TEXT,
    "l_name" TEXT,
    "n_name" TEXT,
    "email" TEXT NOT NULL,
    "sex" "Sex" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Resident_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LogPaid" (
    "id" TEXT NOT NULL,
    "resident_id" TEXT NOT NULL,
    "paid_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LogPaid_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Resident_email_key" ON "Resident"("email");

-- CreateIndex
CREATE INDEX "LogPaid_resident_id_paid_at_idx" ON "LogPaid"("resident_id", "paid_at");

-- AddForeignKey
ALTER TABLE "LogPaid" ADD CONSTRAINT "LogPaid_resident_id_fkey" FOREIGN KEY ("resident_id") REFERENCES "Resident"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
