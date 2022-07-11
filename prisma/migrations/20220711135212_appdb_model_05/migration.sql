-- CreateTable
CREATE TABLE "Followers" (
    "id" SERIAL NOT NULL,
    "followerAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "followerNick" VARCHAR(50) NOT NULL,

    CONSTRAINT "Followers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Followeds" (
    "id" SERIAL NOT NULL,
    "followedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "followedNick" VARCHAR(50) NOT NULL,

    CONSTRAINT "Followeds_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Followers_followerNick_key" ON "Followers"("followerNick");

-- CreateIndex
CREATE UNIQUE INDEX "Followeds_followedNick_key" ON "Followeds"("followedNick");

-- AddForeignKey
ALTER TABLE "Followers" ADD CONSTRAINT "Followers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Followeds" ADD CONSTRAINT "Followeds_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
