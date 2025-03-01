//
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
//
//
//
//
// function getRandomCoordinate(region) {
//     const regions = {
//         north: { lat: [16, 20], lon: [97, 101] },
//         center: { lat: [13, 16], lon: [98, 101] },
//         south: { lat: [6, 13], lon: [98, 102] },
//     };
// 
//     const latRange = regions[region].lat;
//     const lonRange = regions[region].lon;
//
//     const latitude = (Math.random() * (latRange[1] - latRange[0])) + latRange[0];
//     const longitude = (Math.random() * (lonRange[1] - lonRange[0])) + lonRange[0];
//
//     return { latitude, longitude };
// }
//
// async function seedCropInfos() {
//     const plantationAreas = ["north", "center", "south"];
//
//     for (let i = 0; i < 100; i++) {
//         const randomArea = plantationAreas[Math.floor(Math.random() * plantationAreas.length)];
//         const { latitude, longitude } = getRandomCoordinate(randomArea);
//
//         await prisma.crop_infos.create({
//             data: {
//                 plant: "Rice",
//                 growth_stage: "Vegetative",
//                 plantation_area: randomArea,
//                 pest_pressure: Math.random() * 10,
//                 crop_density: Math.random() * 100,
//                 latitude,
//                 longitude,
//             },
//         });
//     }
//
//     console.log("Seeded crop_infos successfully");
// }
//
// seedCropInfos()
//     .catch(e => console.error(e))
//     .finally(async () => {
//         await prisma.$disconnect();
//     });
