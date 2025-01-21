-- CreateTable
CREATE TABLE "mp_posting" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT,
    "creatorName" TEXT NOT NULL,
    "gofundmeUrl" TEXT,
    "location" TEXT NOT NULL,
    "forSelf" BOOLEAN NOT NULL,
    "venmo" TEXT,
    "zelle" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "amountRaised" DOUBLE PRECISION NOT NULL,
    "repostNumber" INTEGER NOT NULL DEFAULT 0,
    "views" INTEGER NOT NULL DEFAULT 0,
    "additionalLinks" JSONB NOT NULL,

    CONSTRAINT "mp_posting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mp_comments" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "commenter" TEXT,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "mp_comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mp_reposts" (
    "id" SERIAL NOT NULL,
    "repostedBy" TEXT NOT NULL,
    "repostedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "mp_reposts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "mp_comments" ADD CONSTRAINT "mp_comments_postId_fkey" FOREIGN KEY ("postId") REFERENCES "mp_posting"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mp_reposts" ADD CONSTRAINT "mp_reposts_postId_fkey" FOREIGN KEY ("postId") REFERENCES "mp_posting"("id") ON DELETE CASCADE ON UPDATE CASCADE;
