/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Resident` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Resident` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `Resident` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Resident" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "LogPaid" (
    "id" TEXT NOT NULL,
    "resident_id" TEXT NOT NULL,
    "paid_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LogPaid_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LogPaid" ADD CONSTRAINT "LogPaid_resident_id_fkey" FOREIGN KEY ("resident_id") REFERENCES "Resident"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
