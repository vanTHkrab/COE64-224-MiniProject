import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";


export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const timeRange = searchParams.get("timeRange");
        const area = <string> searchParams.get("area");
        const crop = <string> searchParams.get("crop");

        // console.log("selectedArea", area);
        // console.log("selectedCrop", crop);
        // console.log("timeRange", timeRange);

        let days = 30;
        if (timeRange === "7days") {
            days = 7;
        } else if (timeRange === "30days") {
            days = 30;
        } else if (timeRange === "90days") {
            days = 90;
        }

        const startDate = new Date();

        const sensorData = await prisma.sensor_datas.findMany({
            where: {
                // timestamp: {
                //     gte: startDate
                // },
            },
            take: days,
            orderBy: {
                id: "desc",
            },
            select: {
                timestamp: true,
                wind_speed: true,
                temperature: true,
                humidity: true,
                soil_moisture: true,
            },
        });

        const cropData = await prisma.crop_infos.findMany({
            where: {
                farm_data: {
                    isNot: null
                },
                // timestamp: {
                //     gte: startDate
                // },
                plantation_area: area,
                plant: crop,
            },
            take: days,
            select: {
                plantation_area: true,
                pest_pressure: true,
                plant: true,
                growth_stage: true,
                timestamp: true,
            },
            orderBy: {
                id: "desc",
            }
        });

        const formattedSoilData = sensorData.map((entry) => ({
            date: entry.timestamp.toISOString().split("T")[0],
            soilMoisture: entry.soil_moisture || 0,
            temperature: entry.temperature || 0,
            humidity: entry.humidity || 0,
            windSpeed: entry.wind_speed || 0,
        }));

        const formattedPestData = cropData.map((entry) => ({
            plantationArea: entry.plantation_area,
            pestPressure: entry.pest_pressure || 0,
            plant: entry.plant,
            growthStage: entry.growth_stage,
            date: entry.timestamp.toISOString().split("T")[0],
        }));

        const formattedGrowthData = cropData.map((entry) => ({
            plantationArea: entry.plantation_area,
            plant: entry.plant,
            growthStage: entry.growth_stage,
            date: entry.timestamp.toISOString().split("T")[0],
        }));

        return NextResponse.json(
            {
                cropData: formattedGrowthData,
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
