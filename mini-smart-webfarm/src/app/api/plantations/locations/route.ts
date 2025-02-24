// File: app/api/plantations/[id]/locations/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all locations for a plantation
export async function GET(request, { params }) {
    try {
        const { id } = params;

        const locations = await prisma.location.findMany({
            where: { plantation_area_id: parseInt(id) }
        });

        return NextResponse.json(locations);
    } catch (error) {
        console.error("Error fetching locations:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// POST new location for a plantation
export async function POST(request, { params }) {
    try {
        const { id } = params;
        const body = await request.json();
        const { name, latitude, longitude } = body;

        // Validate inputs
        if (!name || latitude === undefined || longitude === undefined) {
            return NextResponse.json(
                { error: "Name, latitude, and longitude are required" },
                { status: 400 }
            );
        }

        // Check if plantation exists
        const plantation = await prisma.plantation_area.findUnique({
            where: { id: parseInt(id) }
        });

        if (!plantation) {
            return NextResponse.json({ error: "Plantation not found" }, { status: 404 });
        }

        // Create new location
        const newLocation = await prisma.location.create({
            data: {
                name,
                latitude: latitude.toString(),
                longitude: longitude.toString(),
                plantation_area_id: parseInt(id)
            }
        });

        return NextResponse.json(newLocation, { status: 201 });
    } catch (error) {
        console.error("Error creating location:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// File: app/api/plantations/[id]/locations/[locationId]/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET specific location
export async function GET(request, { params }) {
    try {
        const { id, locationId } = params;

        const location = await prisma.location.findFirst({
            where: {
                id: parseInt(locationId),
                plantation_area_id: parseInt(id)
            }
        });

        if (!location) {
            return NextResponse.json({ error: "Location not found" }, { status: 404 });
        }

        return NextResponse.json(location);
    } catch (error) {
        console.error("Error fetching location:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// Function to delete a location
export async function DELETE(request, { params }) {
    try {
        const { id, locationId } = params;

        // Check if location exists
        const location = await prisma.location.findFirst({
            where: {
                id: parseInt(locationId),
                plantation_area_id: parseInt(id)
            }
        });

        if (!location) {
            return NextResponse.json({ error: "Location not found" }, { status: 404 });
        }

        // Delete the location
        await prisma.location.delete({
            where: { id: parseInt(locationId) }
        });

        return NextResponse.json({ message: "Location deleted successfully" });
    } catch (error) {
        console.error("Error deleting location:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}