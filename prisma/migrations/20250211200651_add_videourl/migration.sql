/*
  Warnings:

  - Added the required column `videoUrl` to the `Lesson` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Lesson" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "videoUrl" TEXT NOT NULL,
    "courseId" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Lesson_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Lesson" ("courseId", "created_at", "id", "order", "title", "updated_at") SELECT "courseId", "created_at", "id", "order", "title", "updated_at" FROM "Lesson";
DROP TABLE "Lesson";
ALTER TABLE "new_Lesson" RENAME TO "Lesson";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
