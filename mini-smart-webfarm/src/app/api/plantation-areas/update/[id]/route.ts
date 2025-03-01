import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ✅ API: อัปเดตพิกัดของ crop_infos ตาม `id`
export async function PUT(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const id = url.pathname.split("/").pop();

        if (!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }

        const { latitude, longitude } = await req.json(); // รับค่า latitude, longitude จาก Body

        if (!latitude || !longitude) {
            return NextResponse.json(
                { error: "Latitude and Longitude are required" },
                { status: 400 }
            );
        }

        // ✅ อัปเดตข้อมูลในฐานข้อมูล
        const updatedCrop = await prisma.crop_infos.update({
            where: { id: Number(id) },
            data: { latitude, longitude },
        });

        return NextResponse.json({ success: true, message: "Coordinates updated successfully", data: updatedCrop });
    } catch (error) {
        console.error("Error updating coordinates:", error);
        return NextResponse.json(
            { error: "Internal Server Error", details: error instanceof Error ? error.message : "" },
            { status: 500 }
        );
    }
}
