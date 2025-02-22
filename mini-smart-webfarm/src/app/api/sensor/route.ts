import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const now = new Date();

        const sensorData = await prisma.sensor_datas.findMany({
            where: {
                timestamp: {
                    lte: now,
                },
            },
            orderBy: { id: 'desc' },
            take: 12,
        });

        return NextResponse.json(sensorData);
    } catch (error) {
        console.error('Error fetching sensor data:', error);
        return NextResponse.error();
    }
}
