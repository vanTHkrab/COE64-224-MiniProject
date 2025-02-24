import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const areas = await prisma.plantation_area_types.findMany({
            select: {
                plantation_area: true,
                soil_type: true,
                crop_infos: true,
                soil_compositions: true,
            }
        });

        if (!areas) {
            return NextResponse.error();
        }
        return NextResponse.json(areas);
    } catch (error) {
        console.error("Error fetching areas data:", error);
        return NextResponse.error();
    }
}
