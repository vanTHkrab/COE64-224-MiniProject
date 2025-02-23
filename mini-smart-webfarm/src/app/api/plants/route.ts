import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const plants = await prisma.crop_infos.findMany({

        });

        if (!plants) {
            throw new Error('Plants not found');
        }

        return NextResponse.json(plants);
    } catch (error) {
        console.error('Error fetching plants:', error);
        return NextResponse.error();
    }
}

