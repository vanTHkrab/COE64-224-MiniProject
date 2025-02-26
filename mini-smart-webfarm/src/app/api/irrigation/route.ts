import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const data = await prisma.irrigation_fertilizations.findMany(
            {
                orderBy: {
                    id: "asc"
                }
            }
        );

        if (!data) {
            return NextResponse.error();
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching irrigation data:", error);
        return NextResponse.error();
    }
}

export async function POST(req: NextRequest) {
    try {
        const { timestamp, irrigation_frequency, fertilizer_usage, water_source_type, water_usage_efficiency } = await req.json();

        const newData = await prisma.irrigation_fertilizations.create({
            data: {
                timestamp,
                irrigation_frequency,
                fertilizer_usage,
                water_source_type,
                water_usage_efficiency
            }
        });

        return NextResponse.json(newData);
    } catch (error) {
        console.error("Error creating irrigation data:", error);
        return NextResponse.error();
    }
}

export async function PUT(req: NextRequest) {
    try {
        const { id, timestamp, irrigation_frequency, fertilizer_usage, water_source_type, water_usage_efficiency } = await req.json();

        const updatedData = await prisma.irrigation_fertilizations.update({
            where: {
                id
            },
            data: {
                timestamp,
                irrigation_frequency,
                fertilizer_usage,
                water_source_type,
                water_usage_efficiency
            }
        });

        return NextResponse.json(updatedData);
    } catch (error) {
        console.error("Error updating irrigation data:", error);
        return NextResponse.error();
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { id } = await req.json();

        const deletedData = await prisma.irrigation_fertilizations.delete({
            where: {
                id
            }
        });

        return NextResponse.json(deletedData);
    } catch (error) {
        console.error("Error deleting irrigation data:", error);
        return NextResponse.error();
    }
}
