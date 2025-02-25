import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    try {
        const { timeRange } = req.query;

        let days = 30; // Default range is 30 days
        if (timeRange === "7days") days = 7;
        else if (timeRange === "90days") days = 90;

        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);

        // Fetch Soil Moisture and Pest Pressure based on Time Range
        const sensorData = await prisma.sensor_datas.findMany({
            where: {
                timestamp: { gte: startDate },
            },
            select: {
                timestamp: true,
                soil_moisture: true,
            },
        });

        const cropData = await prisma.crop_infos.findMany({
            where: {
                farm_data: { isNot: null },
            },
            select: {
                plantation_area: true,
                pest_pressure: true,
            },
        });

        // Format data for charts
        const formattedSoilData = sensorData.map((entry) => ({
            date: entry.timestamp.toISOString().split("T")[0],
            soilMoisture: entry.soil_moisture || 0,
        }));

        const formattedPestData = cropData.map((entry) => ({
            plantationArea: entry.plantation_area,
            pestPressure: entry.pest_pressure || 0,
        }));

        res.status(200).json({
            soilData: formattedSoilData,
            pestData: formattedPestData,
        });
    } catch (error) {
        console.error("Error fetching analytics data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
