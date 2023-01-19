/*
  Warnings:

  - Changed the type of `expires_date` on the `user_tokens` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "user_tokens" DROP COLUMN "expires_date",
ADD COLUMN     "expires_date" TIMESTAMP(3) NOT NULL;
