/*
  Warnings:

  - You are about to drop the column `userId` on the `Post` table. All the data in the column will be lost.
  - You are about to alter the column `password` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(187)`.
  - Added the required column `userNick` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_userId_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "userId",
ADD COLUMN     "userNick" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "password" SET DATA TYPE VARCHAR(187);

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userNick_fkey" FOREIGN KEY ("userNick") REFERENCES "User"("nick") ON DELETE RESTRICT ON UPDATE CASCADE;
