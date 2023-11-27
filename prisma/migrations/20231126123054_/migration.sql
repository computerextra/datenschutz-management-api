-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "mail" TEXT,
    "roleId" TEXT NOT NULL,
    CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "AVV" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "kundenummer" TEXT NOT NULL,
    "kundenname" TEXT NOT NULL,
    "freigegeben" BOOLEAN NOT NULL DEFAULT false,
    "angelegt_am" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "freigegeben_am" DATETIME,
    "vertrag" TEXT NOT NULL
);
