/*
  Warnings:

  - Added the required column `selected` to the `LootTable` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_LootTable" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "selected" BOOLEAN NOT NULL
);
INSERT INTO "new_LootTable" ("description", "id", "name") SELECT "description", "id", "name" FROM "LootTable";
DROP TABLE "LootTable";
ALTER TABLE "new_LootTable" RENAME TO "LootTable";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
