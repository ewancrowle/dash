-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Card" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "deckId" TEXT NOT NULL,
    "front" TEXT NOT NULL,
    "back" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastReviewed" DATETIME,
    "lastScore" INTEGER,
    "nextReview" DATETIME,
    CONSTRAINT "Card_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Card" ("back", "createdAt", "deckId", "front", "id", "lastReviewed", "lastScore", "nextReview") SELECT "back", "createdAt", "deckId", "front", "id", "lastReviewed", "lastScore", "nextReview" FROM "Card";
DROP TABLE "Card";
ALTER TABLE "new_Card" RENAME TO "Card";
CREATE UNIQUE INDEX "Card_deckId_key" ON "Card"("deckId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
