import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const plants = await prisma.crop_infos.findMany({
            select: {
                id: true,
                plant: true,
                plantation_area: true,
                growth_stage: true,
                pest_pressure: true,
                crop_density: true,
                growth_stage_rel: {
                    select: {
                        plant_season: true,
                    }
                },
            }
        });

        if (!plants) {
            throw new Error('Plants not found');
        }

        const transformedPlants = plants.map((plant) => ({
            ...plant,
            plant_season: plant.growth_stage_rel?.plant_season || "N/A",
        }));

        return NextResponse.json(transformedPlants);
    } catch (error) {
        console.error('Error fetching plants:', error);
        return NextResponse.error();
    }
}
