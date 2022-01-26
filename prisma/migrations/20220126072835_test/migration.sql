/*
  Warnings:

  - You are about to drop the column `resume` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `skills` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "resume",
DROP COLUMN "skills";

-- CreateTable
CREATE TABLE "moka" (
    "id" SERIAL NOT NULL,
    "fullName" VARCHAR(150) NOT NULL,
    "email" TEXT NOT NULL,
    "resume" TEXT NOT NULL,
    "second_resume" TEXT NOT NULL,
    "calendy_url" VARCHAR(255) NOT NULL,
    "profile_img" VARCHAR(255) NOT NULL,
    "social_media" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skills" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(150) NOT NULL,
    "description" TEXT NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "color" VARCHAR(255) NOT NULL,
    "class" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(150) NOT NULL,
    "img" VARCHAR(255) NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "tags" JSONB NOT NULL,
    "description" TEXT NOT NULL,
    "category" VARCHAR(255) NOT NULL,
    "featured" BOOLEAN NOT NULL,
    "resume" VARCHAR(255) NOT NULL,
    "company" VARCHAR(255) NOT NULL,
    "company_logo" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "moka.email_unique" ON "moka"("email");
