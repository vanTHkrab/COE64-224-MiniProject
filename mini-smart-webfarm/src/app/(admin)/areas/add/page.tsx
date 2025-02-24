// File: app/api/plantations/route.js
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

// File: app/api/plantations/[id]/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET specific plantation by ID
export async function GET(request, { params }) {
    try {
        const { id } = params;

        const areaType = await prisma.plantation_area_types.findFirst({
            where: { plantation_area_id: parseInt(id) },
            include: {
                plantation_area: {
                    include: { locations: true }
                },
                soil_type: true
            }
        });

        if (!areaType) {
            return NextResponse.json({ error: "Plantation not found" }, { status: 404 });
        }

        return NextResponse.json(areaType);
    } catch (error) {
        console.error("Error fetching plantation:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// UPDATE plantation by ID
export async function PUT(request, { params }) {
    try {
        const { id } = params;
        const body = await request.json();
        const { name, size } = body;

        // Validate inputs
        if (!name && size === undefined) {
            return NextResponse.json(
                { error: "At least one field (name or size) must be provided" },
                { status: 400 }
            );
        }

        // Update the plantation area
        const updatedPlantation = await prisma.plantation_area.update({
            where: { id: parseInt(id) },
            data: {
                ...(name && { name }),
                ...(size !== undefined && { size }),
            },
        });

        return NextResponse.json(updatedPlantation);
    } catch (error) {
        console.error("Error updating plantation:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// DELETE plantation by ID
export async function DELETE(request, { params }) {
    try {
        const { id } = params;

        // First, find the plantation area type
        const areaType = await prisma.plantation_area_types.findFirst({
            where: { plantation_area_id: parseInt(id) }
        });

        if (!areaType) {
            return NextResponse.json({ error: "Plantation not found" }, { status: 404 });
        }

        // Delete the plantation_area_types record
        await prisma.plantation_area_types.delete({
            where: { id: areaType.id }
        });

        // Delete associated locations
        await prisma.location.deleteMany({
            where: { plantation_area_id: parseInt(id) }
        });

        // Delete the plantation_area record
        await prisma.plantation_area.delete({
            where: { id: parseInt(id) }
        });

        return NextResponse.json({ message: "Plantation deleted successfully" });
    } catch (error) {
        console.error("Error deleting plantation:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}