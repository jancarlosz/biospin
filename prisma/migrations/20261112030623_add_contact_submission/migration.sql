-- CreateTable
CREATE TABLE "ContactSubmission" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "company" TEXT,
    "institution" TEXT,
    "role" TEXT,
    "segment" TEXT,
    "interestType" TEXT,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "requestQuote" BOOLEAN NOT NULL DEFAULT false,
    "origin" TEXT,
    "consentLGPD" BOOLEAN NOT NULL DEFAULT false,
    "consentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContactSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ContactSubmission_createdAt_idx" ON "ContactSubmission"("createdAt" DESC);
