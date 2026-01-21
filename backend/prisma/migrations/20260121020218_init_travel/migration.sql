-- CreateTable
CREATE TABLE "MasterLayanan" (
    "idLayanan" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "namaLayanan" TEXT NOT NULL,
    "rute" TEXT NOT NULL,
    "jadwalBerangkat" DATETIME NOT NULL,
    "hargaTiket" REAL NOT NULL,
    "stokKursi" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "TbKendaraan" (
    "idKendaraan" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "namaKendaraan" TEXT NOT NULL,
    "jenisKendaraan" TEXT NOT NULL,
    "noPolisi" TEXT NOT NULL,
    "kapasitas" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "MasterUser" (
    "idUser" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "TbPelanggan" (
    "idPelanggan" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "namaPelanggan" TEXT NOT NULL,
    "noHp" TEXT,
    "email" TEXT
);

-- CreateTable
CREATE TABLE "TbPemesanan" (
    "idPemesanan" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tglPemesanan" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "jumlahKursi" INTEGER NOT NULL,
    "totalBiaya" REAL NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'DIBOOKING',
    "idLayanan" INTEGER NOT NULL,
    "idPelanggan" INTEGER NOT NULL,
    CONSTRAINT "TbPemesanan_idLayanan_fkey" FOREIGN KEY ("idLayanan") REFERENCES "MasterLayanan" ("idLayanan") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TbPemesanan_idPelanggan_fkey" FOREIGN KEY ("idPelanggan") REFERENCES "TbPelanggan" ("idPelanggan") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TbTransaksi" (
    "idTransaksi" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tglTransaksi" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "jumlahBayar" REAL NOT NULL,
    "metodeBayar" TEXT NOT NULL,
    "idPemesanan" INTEGER NOT NULL,
    CONSTRAINT "TbTransaksi_idPemesanan_fkey" FOREIGN KEY ("idPemesanan") REFERENCES "TbPemesanan" ("idPemesanan") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_KendaraanToLayanan" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_KendaraanToLayanan_A_fkey" FOREIGN KEY ("A") REFERENCES "MasterLayanan" ("idLayanan") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_KendaraanToLayanan_B_fkey" FOREIGN KEY ("B") REFERENCES "TbKendaraan" ("idKendaraan") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "MasterUser_username_key" ON "MasterUser"("username");

-- CreateIndex
CREATE UNIQUE INDEX "TbTransaksi_idPemesanan_key" ON "TbTransaksi"("idPemesanan");

-- CreateIndex
CREATE UNIQUE INDEX "_KendaraanToLayanan_AB_unique" ON "_KendaraanToLayanan"("A", "B");

-- CreateIndex
CREATE INDEX "_KendaraanToLayanan_B_index" ON "_KendaraanToLayanan"("B");
