-- CreateEnum
CREATE TYPE "product_types" AS ENUM ('TTS', 'STT', 'NLU', 'ASSISTANT');

-- CreateEnum
CREATE TYPE "product_vendors" AS ENUM ('GOOGLE', 'MICROSOFT', 'AMAZON', 'IBM', 'RASA', 'GENERIC');

-- CreateTable
CREATE TABLE "applications" (
    "ref" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "applications_pkey" PRIMARY KEY ("ref")
);

-- CreateTable
CREATE TABLE "tts_services" (
    "ref" TEXT NOT NULL,
    "config" JSONB NOT NULL,
    "application_ref" TEXT NOT NULL,
    "product_ref" TEXT NOT NULL,

    CONSTRAINT "tts_services_pkey" PRIMARY KEY ("ref")
);

-- CreateTable
CREATE TABLE "stt_services" (
    "ref" TEXT NOT NULL,
    "config" JSONB NOT NULL,
    "application_ref" TEXT NOT NULL,
    "product_ref" TEXT NOT NULL,

    CONSTRAINT "stt_services_pkey" PRIMARY KEY ("ref")
);

-- CreateTable
CREATE TABLE "conversation_services" (
    "ref" TEXT NOT NULL,
    "config" JSONB NOT NULL,
    "application_ref" TEXT NOT NULL,
    "product_ref" TEXT NOT NULL,

    CONSTRAINT "conversation_services_pkey" PRIMARY KEY ("ref")
);

-- CreateTable
CREATE TABLE "products" (
    "ref" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "vendor" "product_vendors" NOT NULL,
    "type" "product_types" NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("ref")
);

-- CreateIndex
CREATE UNIQUE INDEX "tts_services_application_ref_key" ON "tts_services"("application_ref");

-- CreateIndex
CREATE INDEX "tts_services_application_ref_idx" ON "tts_services" USING HASH ("application_ref");

-- CreateIndex
CREATE INDEX "tts_services_product_ref_idx" ON "tts_services" USING HASH ("product_ref");

-- CreateIndex
CREATE UNIQUE INDEX "stt_services_application_ref_key" ON "stt_services"("application_ref");

-- CreateIndex
CREATE INDEX "stt_services_application_ref_idx" ON "stt_services" USING HASH ("application_ref");

-- CreateIndex
CREATE INDEX "stt_services_product_ref_idx" ON "stt_services" USING HASH ("product_ref");

-- CreateIndex
CREATE UNIQUE INDEX "conversation_services_application_ref_key" ON "conversation_services"("application_ref");

-- CreateIndex
CREATE INDEX "conversation_services_application_ref_idx" ON "conversation_services" USING HASH ("application_ref");

-- CreateIndex
CREATE INDEX "conversation_services_product_ref_idx" ON "conversation_services" USING HASH ("product_ref");

-- AddForeignKey
ALTER TABLE "tts_services" ADD CONSTRAINT "tts_services_application_ref_fkey" FOREIGN KEY ("application_ref") REFERENCES "applications"("ref") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tts_services" ADD CONSTRAINT "tts_services_product_ref_fkey" FOREIGN KEY ("product_ref") REFERENCES "products"("ref") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stt_services" ADD CONSTRAINT "stt_services_application_ref_fkey" FOREIGN KEY ("application_ref") REFERENCES "applications"("ref") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stt_services" ADD CONSTRAINT "stt_services_product_ref_fkey" FOREIGN KEY ("product_ref") REFERENCES "products"("ref") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversation_services" ADD CONSTRAINT "conversation_services_application_ref_fkey" FOREIGN KEY ("application_ref") REFERENCES "applications"("ref") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversation_services" ADD CONSTRAINT "conversation_services_product_ref_fkey" FOREIGN KEY ("product_ref") REFERENCES "products"("ref") ON DELETE CASCADE ON UPDATE CASCADE;
