-- CreateTable
CREATE TABLE "LootTable" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "LootItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "lootTableId" INTEGER NOT NULL,
    CONSTRAINT "LootItem_lootTableId_fkey" FOREIGN KEY ("lootTableId") REFERENCES "LootTable" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
