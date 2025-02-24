import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const data = await prisma.irrigation_fertilizations.findMany({
            select: {
                id: true,
                timestamp: true,
                irrigation_frequency: true,
                fertilizer_usage: true,
                water_source_type: true,
            }
        });

        if (!data) {
            return NextResponse.error();
        }
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching irrigation data:", error);
        return NextResponse.error();
    }
}
