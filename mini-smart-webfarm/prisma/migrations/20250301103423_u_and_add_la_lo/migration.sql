/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `crop_infos` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `farm_datas` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `geo_environmentals` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `irrigation_fertilizations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `sensor_datas` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `soil_compositions` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "crop_infos" ADD COLUMN     "latitude" DOUBLE PRECISION,
ADD COLUMN     "longitude" DOUBLE PRECISION;

-- CreateIndex
CREATE UNIQUE INDEX "crop_infos_id_key" ON "crop_infos"("id");

-- CreateIndex
CREATE UNIQUE INDEX "farm_datas_id_key" ON "farm_datas"("id");

-- CreateIndex
CREATE UNIQUE INDEX "geo_environmentals_id_key" ON "geo_environmentals"("id");

-- CreateIndex
CREATE UNIQUE INDEX "irrigation_fertilizations_id_key" ON "irrigation_fertilizations"("id");

-- CreateIndex
CREATE UNIQUE INDEX "sensor_datas_id_key" ON "sensor_datas"("id");

-- CreateIndex
CREATE UNIQUE INDEX "soil_compositions_id_key" ON "soil_compositions"("id");
