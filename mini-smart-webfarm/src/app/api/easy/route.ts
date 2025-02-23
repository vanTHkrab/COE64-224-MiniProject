import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
    try {
        const crops = await prisma.crop_infos.findMany({
            select:{
                id: true,
                plant: true,
            },
            where: {
                plant: {
                    equals: "rice"

                }
            }
        });

        if (!crops) {
            throw new Error('Crops not found');
        }

        return NextResponse.json(crops);
    } catch (error) {
        console.error('Error fetching crops:', error);
        return NextResponse.error();
    }
}