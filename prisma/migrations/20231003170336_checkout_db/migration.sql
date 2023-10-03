-- CreateTable
CREATE TABLE "crowdCheckOut" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "email" STRING NOT NULL,
    "note" STRING NOT NULL,
    "abegID" STRING NOT NULL,
    "userID" STRING,
    "amount" INT4 NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "crowdCheckOut_pkey" PRIMARY KEY ("id")
);
