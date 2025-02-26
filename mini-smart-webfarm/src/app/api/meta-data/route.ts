import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        // Fetch sensor data from the sensor_datas model
        const sensorData = await prisma.sensor_datas.findMany({
            select: {
                id: true,
                timestamp: true,
                temperature: true,
                humidity: true,
                ph: true,
                rainfall: true,
                soil_moisture: true,
                sunlight_exposure: true,
                wind_speed: true,
                co2_concentration: true,
                frost_risk: true,
                water_usage_efficiency: true,
            },
        });

        // Fetch soil composition data from the soil_compositions model
        const soilData = await prisma.soil_compositions.findMany({
            select: {
                id: true,
                nitrogen: true,
                phosphorus: true,
                potassium: true,
                organic_matter: true,
                soil_type: true,
            },
        });

        // Fetch irrigation and fertilization data from the irrigation_fertilizations model
        const irrigationData = await prisma.irrigation_fertilizations.findMany({
            select: {
                id: true,
                irrigation_frequency: true,
                fertilizer_usage: true,
                water_source_type: true,
                timestamp: true,
            },
        });

        // Fetch crop information from the crop_infos model
        const cropData = await prisma.crop_infos.findMany({
            select: {
                id: true,
                plant: true,
                growth_stage: true,
                plantation_area: true,
                pest_pressure: true,
                crop_density: true,
            },
        });

        // Return all the fetched data in one JSON response
        return NextResponse.json({
            sensorData,
            soilData,
            irrigationData,
            cropData,
        });
    } catch (error) {
        console.error("Error fetching data:", error);
        return NextResponse.json(
            {
                error: "Internal Server Error",
                details: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}
