import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";

export async function GET() {
    try {
        const areas = await prisma.crop_infos.findMany({
            select: {
                id: true,
                plantation_area: true,
                latitude: true,
                longitude: true}
        });
        return NextResponse.json(areas);
    } catch (error) {
        console.error("Database error fetching plantation areas:", error);
        if (error instanceof Error) {
            return NextResponse.json(
                {error: "Internal Server Error", details: error.message},
                {status: 500}
            );
        }
        return NextResponse.json(
            {error: "Internal Server Error"},
            {status: 500}
        );
    }
}