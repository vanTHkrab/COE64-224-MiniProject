import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
    try {
        const weather = await prisma.sensor_datas.findMany({
            orderBy: {
                id: "desc",
            },
            take: 1,
        });

        return NextResponse.json(weather);
    } catch (error) {
        return NextResponse.error();
    }
}