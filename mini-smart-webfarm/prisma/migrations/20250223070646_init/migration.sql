-- CreateTable
CREATE TABLE "farm_datas" (
    "id" SERIAL NOT NULL,
    "sensor_datasId" INTEGER NOT NULL,
    "soil_compositionsId" INTEGER NOT NULL,
    "irrigation_fertilizationsId" INTEGER NOT NULL,
    "crop_infosId" INTEGER NOT NULL,
    "geo_environmentalsId" INTEGER NOT NULL,

    CONSTRAINT "farm_datas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "growth_stage" (
    "growth_stage" TEXT NOT NULL,
    "plant_season" TEXT NOT NULL,

    CONSTRAINT "growth_stage_pkey" PRIMARY KEY ("growth_stage","plant_season")
);

-- CreateTable
CREATE TABLE "plantation_area_types" (
    "plantation_area" TEXT NOT NULL,
    "soil_type" TEXT NOT NULL,

    CONSTRAINT "plantation_area_types_pkey" PRIMARY KEY ("plantation_area","soil_type")
);

-- CreateTable
CREATE TABLE "sensor_datas" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "temperature" DOUBLE PRECISION,
    "humidity" DOUBLE PRECISION,
    "ph" DOUBLE PRECISION,
    "rainfall" DOUBLE PRECISION,
    "soil_moisture" DOUBLE PRECISION,
    "sunlight_exposure" DOUBLE PRECISION,
    "wind_speed" DOUBLE PRECISION,
    "co2_concentration" DOUBLE PRECISION,
    "frost_risk" DOUBLE PRECISION,
    "water_usage_efficiency" DOUBLE PRECISION,

    CONSTRAINT "sensor_datas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "soil_compositions" (
    "id" SERIAL NOT NULL,
    "nitrogen" INTEGER NOT NULL,
    "phosphorus" INTEGER NOT NULL,
    "potassium" INTEGER NOT NULL,
    "organic_matter" DOUBLE PRECISION,
    "soil_type" TEXT NOT NULL,

    CONSTRAINT "soil_compositions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "irrigation_fertilizations" (
    "id" SERIAL NOT NULL,
    "irrigation_frequency" INTEGER,
    "fertilizer_usage" DOUBLE PRECISION,
    "water_source_type" TEXT NOT NULL,

    CONSTRAINT "irrigation_fertilizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "crop_infos" (
    "id" SERIAL NOT NULL,
    "plant" TEXT NOT NULL,
    "growth_stage" TEXT NOT NULL,
    "plantation_area" TEXT NOT NULL,
    "pest_pressure" DOUBLE PRECISION,
    "crop_density" DOUBLE PRECISION,

    CONSTRAINT "crop_infos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "geo_environmentals" (
    "id" SERIAL NOT NULL,
    "urban_area_proximity" DOUBLE PRECISION,

    CONSTRAINT "geo_environmentals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "username" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "refresh_token_expires_in" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Authenticator" (
    "credentialID" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "credentialPublicKey" TEXT NOT NULL,
    "counter" INTEGER NOT NULL,
    "credentialDeviceType" TEXT NOT NULL,
    "credentialBackedUp" BOOLEAN NOT NULL,
    "transports" TEXT,

    CONSTRAINT "Authenticator_pkey" PRIMARY KEY ("userId","credentialID")
);

-- CreateIndex
CREATE UNIQUE INDEX "farm_datas_sensor_datasId_key" ON "farm_datas"("sensor_datasId");

-- CreateIndex
CREATE UNIQUE INDEX "farm_datas_soil_compositionsId_key" ON "farm_datas"("soil_compositionsId");

-- CreateIndex
CREATE UNIQUE INDEX "farm_datas_irrigation_fertilizationsId_key" ON "farm_datas"("irrigation_fertilizationsId");

-- CreateIndex
CREATE UNIQUE INDEX "farm_datas_crop_infosId_key" ON "farm_datas"("crop_infosId");

-- CreateIndex
CREATE UNIQUE INDEX "farm_datas_geo_environmentalsId_key" ON "farm_datas"("geo_environmentalsId");

-- CreateIndex
CREATE UNIQUE INDEX "growth_stage_growth_stage_key" ON "growth_stage"("growth_stage");

-- CreateIndex
CREATE UNIQUE INDEX "growth_stage_plant_season_key" ON "growth_stage"("plant_season");

-- CreateIndex
CREATE UNIQUE INDEX "plantation_area_types_plantation_area_key" ON "plantation_area_types"("plantation_area");

-- CreateIndex
CREATE UNIQUE INDEX "plantation_area_types_soil_type_key" ON "plantation_area_types"("soil_type");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_id_key" ON "Account"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Account_userId_key" ON "Account"("userId");

-- CreateIndex
CREATE INDEX "Account_userId_idx" ON "Account"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_id_key" ON "Session"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "Authenticator_credentialID_key" ON "Authenticator"("credentialID");

-- AddForeignKey
ALTER TABLE "farm_datas" ADD CONSTRAINT "farm_datas_sensor_datasId_fkey" FOREIGN KEY ("sensor_datasId") REFERENCES "sensor_datas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "farm_datas" ADD CONSTRAINT "farm_datas_soil_compositionsId_fkey" FOREIGN KEY ("soil_compositionsId") REFERENCES "soil_compositions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "farm_datas" ADD CONSTRAINT "farm_datas_irrigation_fertilizationsId_fkey" FOREIGN KEY ("irrigation_fertilizationsId") REFERENCES "irrigation_fertilizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "farm_datas" ADD CONSTRAINT "farm_datas_crop_infosId_fkey" FOREIGN KEY ("crop_infosId") REFERENCES "crop_infos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "farm_datas" ADD CONSTRAINT "farm_datas_geo_environmentalsId_fkey" FOREIGN KEY ("geo_environmentalsId") REFERENCES "geo_environmentals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "soil_compositions" ADD CONSTRAINT "soil_compositions_soil_type_fkey" FOREIGN KEY ("soil_type") REFERENCES "plantation_area_types"("soil_type") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crop_infos" ADD CONSTRAINT "crop_infos_growth_stage_fkey" FOREIGN KEY ("growth_stage") REFERENCES "growth_stage"("growth_stage") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crop_infos" ADD CONSTRAINT "crop_infos_plantation_area_fkey" FOREIGN KEY ("plantation_area") REFERENCES "plantation_area_types"("plantation_area") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Authenticator" ADD CONSTRAINT "Authenticator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
