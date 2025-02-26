import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";

export async function GET() {
    try {
        const crops = await prisma.crop_infos.findMany({
            select: { plant: true }, // Fetch only crop names
        });
        return NextResponse.json(crops);
    } catch (error) {
        console.error("Database error fetching crop types:", error);
        // Ensure error is treated as an instance of Error
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
