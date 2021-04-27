/*
  Warnings:

  - The migration will change the primary key for the `User` table. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userName` on the `User` table. All the data in the column will be lost.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    DROP COLUMN `userName`,
    ADD COLUMN     `email` VARCHAR(191) NOT NULL,
    ADD COLUMN     `password` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`email`);
