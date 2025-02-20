/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `crop_infos` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `geo_environmentals` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `irrigation_fertilizations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `sensor_datas` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Session` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `soil_compositions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Account_id_key` ON `Account`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `crop_infos_id_key` ON `crop_infos`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `geo_environmentals_id_key` ON `geo_environmentals`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `irrigation_fertilizations_id_key` ON `irrigation_fertilizations`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `sensor_datas_id_key` ON `sensor_datas`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `Session_id_key` ON `Session`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `soil_compositions_id_key` ON `soil_compositions`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `User_id_key` ON `User`(`id`);
