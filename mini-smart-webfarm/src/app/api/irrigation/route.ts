import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
    const data = await prisma.irrigation_fertilizations.findMany({
        select: {
            timestamp: true,
            irrigation_frequency: true,
            fertilizer_usage: true,
            water_source_type: true,
        }
    });
    return NextResponse.json(data);
}