import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";


export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const timeRange = searchParams.get("timeRange");

        let days = 30; // Default range is 30 days
        if (timeRange === "7days") {
            days = 7;
        } else if (timeRange === "90days") {
            days = 90;
        }

        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);

        // Fetch Soil Moisture data based on Time Range
        const sensorData = await prisma.sensor_datas.findMany({
            where: {
                timestamp: { gte: startDate },
            },
            select: {
                timestamp: true,
                soil_moisture: true,
            },
        });

        // Fetch Pest Pressure data based on plantation areas
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

        return NextResponse.json(
            {
                soilData: formattedSoilData,
                pestData: formattedPestData,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching analytics data:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
