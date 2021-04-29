/*
  Warnings:

  - The migration will change the primary key for the `Post` table. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `postId` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The migration will change the primary key for the `User` table. If it partially fails, the table could be left without primary key constraint.
  - The migration will add a unique constraint covering the columns `[postId]` on the table `Post`. If there are existing duplicate values, the migration will fail.
  - The migration will add a unique constraint covering the columns `[email]` on the table `User`. If there are existing duplicate values, the migration will fail.
  - The migration will add a unique constraint covering the columns `[userId]` on the table `User`. If there are existing duplicate values, the migration will fail.

*/
-- AlterTable
ALTER TABLE `Post` DROP PRIMARY KEY,
    MODIFY `postId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    ADD PRIMARY KEY (`id`);

-- CreateIndex
CREATE UNIQUE INDEX `Post.postId_unique` ON `Post`(`postId`);

-- CreateIndex
CREATE UNIQUE INDEX `User.email_unique` ON `User`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `User.userId_unique` ON `User`(`userId`);
