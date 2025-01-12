-- CreateTable
CREATE TABLE "ma_resources" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "tags" TEXT[],
    "desc" TEXT,
    "created_dt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ma_resources_pkey" PRIMARY KEY ("id")
);
