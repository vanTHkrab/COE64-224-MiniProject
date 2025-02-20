import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {

    const sensorData = await prisma.sensor_datas.findMany();

    if (!sensorData) {
        return NextResponse.json({ message: "No data found" }, { status: 404 });
    }

    return NextResponse.json(sensorData, { status: 200 });
}

