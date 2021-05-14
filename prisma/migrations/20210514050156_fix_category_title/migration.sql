/*
  Warnings:

  - You are about to drop the column `title` on the `Category` table. All the data in the column will be lost.
  - Added the required column `categoryTitle` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Category` DROP COLUMN `title`,
    ADD COLUMN     `categoryTitle` VARCHAR(191) NOT NULL;
