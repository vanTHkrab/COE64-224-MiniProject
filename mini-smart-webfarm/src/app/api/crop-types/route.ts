import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const crops = await prisma.crop_infos.findMany({
            select: { plant: true } // Fetch only crop names
        });
        return NextResponse.json(crops);
    } catch (error) {
        console.error("Database error fetching crop types:", error);
        return NextResponse.json(
            { error: "Internal Server Error", details: error.message },
            { status: 500 }
        );
    }
}
