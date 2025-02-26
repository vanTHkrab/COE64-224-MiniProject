import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const areas = await prisma.plantation_area_types.findMany({
            select: { plantation_area: true, soil_type: true }
        });
        return NextResponse.json(areas);
    } catch (error) {
        console.error("Database error fetching plantation areas:", error);
        if (error instanceof Error) {
            return NextResponse.json(
                { error: "Internal Server Error", details: error.message },
                { status: 500 }
            );
        }
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
