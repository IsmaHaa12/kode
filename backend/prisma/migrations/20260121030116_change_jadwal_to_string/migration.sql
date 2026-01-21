-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MasterLayanan" (
    "idLayanan" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "namaLayanan" TEXT NOT NULL,
    "rute" TEXT NOT NULL,
    "jadwalBerangkat" TEXT NOT NULL,
    "hargaTiket" REAL NOT NULL,
    "stokKursi" INTEGER NOT NULL
);
INSERT INTO "new_MasterLayanan" ("hargaTiket", "idLayanan", "jadwalBerangkat", "namaLayanan", "rute", "stokKursi") SELECT "hargaTiket", "idLayanan", "jadwalBerangkat", "namaLayanan", "rute", "stokKursi" FROM "MasterLayanan";
DROP TABLE "MasterLayanan";
ALTER TABLE "new_MasterLayanan" RENAME TO "MasterLayanan";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
