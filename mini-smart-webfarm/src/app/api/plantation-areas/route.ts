import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const areas = await prisma.plantation_area_types.findMany({
            select: { plantation_area: true, soil_type: true } // Fetch only required fields
        });
        return NextResponse.json(areas);
    } catch (error) {
        console.error("Database error fetching plantation areas:", error);
        return NextResponse.json(
            { error: "Internal Server Error", details: error.message },
            { status: 500 }
        );
    }
}
