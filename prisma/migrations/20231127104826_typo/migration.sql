/*
  Warnings:

  - You are about to drop the column `kundenummer` on the `AVV` table. All the data in the column will be lost.
  - Added the required column `kundennummer` to the `AVV` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AVV" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "kundennummer" TEXT NOT NULL,
    "kundenname" TEXT NOT NULL,
    "freigegeben" BOOLEAN NOT NULL DEFAULT false,
    "angelegt_am" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "freigegeben_am" DATETIME,
    "vertrag" TEXT NOT NULL,
    "kommentar" TEXT
);
INSERT INTO "new_AVV" ("angelegt_am", "freigegeben", "freigegeben_am", "id", "kommentar", "kundenname", "vertrag") SELECT "angelegt_am", "freigegeben", "freigegeben_am", "id", "kommentar", "kundenname", "vertrag" FROM "AVV";
DROP TABLE "AVV";
ALTER TABLE "new_AVV" RENAME TO "AVV";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
