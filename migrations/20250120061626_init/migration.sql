-- AlterTable
ALTER TABLE "mp_posting" ADD COLUMN     "likesNumber" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "mp_likes" (
    "id" SERIAL NOT NULL,
    "likedBy" TEXT NOT NULL,
    "likedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "mp_likes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "mp_likes" ADD CONSTRAINT "mp_likes_postId_fkey" FOREIGN KEY ("postId") REFERENCES "mp_posting"("id") ON DELETE CASCADE ON UPDATE CASCADE;
