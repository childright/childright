-- CreateTable
CREATE TABLE "Step1Data" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "isParent" BOOLEAN NOT NULL,
    "birthDate" DATETIME,
    CONSTRAINT "Step1Data_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Step1Data_userId_key" ON "Step1Data"("userId");
