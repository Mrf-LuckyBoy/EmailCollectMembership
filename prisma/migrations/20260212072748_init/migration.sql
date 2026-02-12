-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('Man', 'Woman');

-- CreateTable
CREATE TABLE "Resident" (
    "id" TEXT NOT NULL,
    "f_name" TEXT,
    "l_name" TEXT,
    "n_name" TEXT,
    "sex" "Sex" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Resident_pkey" PRIMARY KEY ("id")
);
