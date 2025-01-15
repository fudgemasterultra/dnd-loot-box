/*
  Warnings:

  - Added the required column `description` to the `LootItem` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_LootItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "lootTableId" INTEGER NOT NULL,
    CONSTRAINT "LootItem_lootTableId_fkey" FOREIGN KEY ("lootTableId") REFERENCES "LootTable" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_LootItem" ("id", "lootTableId", "name") SELECT "id", "lootTableId", "name" FROM "LootItem";
DROP TABLE "LootItem";
ALTER TABLE "new_LootItem" RENAME TO "LootItem";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
