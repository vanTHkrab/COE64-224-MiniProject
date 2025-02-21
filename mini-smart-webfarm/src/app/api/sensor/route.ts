import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {

    try {
        const sensorData = await prisma.sensor_datas.findMany({
            orderBy: {timestamp: 'asc'},
            take: 24,
        });

        if (!sensorData) {
            throw new Error('Sensor data not found');
        }

        return NextResponse.json(sensorData);
    } catch (error) {
        console.error('Error fetching sensor data:', error);
        return NextResponse.error();
    }
}

