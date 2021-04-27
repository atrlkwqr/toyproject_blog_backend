/*
  Warnings:

  - The migration will change the primary key for the `Post` table. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `Post` DROP PRIMARY KEY,
    ADD PRIMARY KEY (`postId`);
