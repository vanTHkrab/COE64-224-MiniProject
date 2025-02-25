import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all plantations
export async function GET() {
    try {
        const areas = await prisma.plantation_area_types.findMany({
            include: {
                plantation_area: {
                    include: {
                        locations: true
                    }
                },
                soil_type: true,
                crop_infos: true,
                soil_compositions: true
            }
        });

        if (!areas) {
            return NextResponse.json({ error: "No areas found" }, { status: 404 });
        }

        return NextResponse.json(areas);
    } catch (error) {
        console.error("Error fetching areas data:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// POST new plantation
export async function POST(request) {
    try {
        const body = await request.json();
        const { name, size } = body;

        // Validate inputs
        if (!name || !size) {
            return NextResponse.json(
                { error: "Name and size are required" },
                { status: 400 }
            );
        }

        // Create new plantation area
        const newPlantationArea = await prisma.plantation_area.create({
            data: {
                name,
                size,
            },
        });

        // Create plantation area type
        const newPlantationAreaType = await prisma.plantation_area_types.create({
            data: {
                plantation_area_id: newPlantationArea.id,
            },
        });

        return NextResponse.json(newPlantationArea, { status: 201 });
    } catch (error) {
        console.error("Error creating plantation:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
}