/*
  Warnings:

  - You are about to drop the column `water_usage_efficiency` on the `sensor_datas` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "crop_infos" ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "irrigation_fertilizations" ADD COLUMN     "water_usage_efficiency" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "sensor_datas" DROP COLUMN "water_usage_efficiency";
