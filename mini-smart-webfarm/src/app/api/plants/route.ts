import { NextResponse, NextRequest } from 'next/server';
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
                timestamp: true,
            },
            orderBy: {
                id: 'asc',
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

export async function POST(req: NextRequest) {

    try {
        const { plant, plantation_area, growth_stage, pest_pressure, crop_density } = await req.json();

        const newPlant = await prisma.crop_infos.create({
            data: {
                plant,
                plantation_area,
                growth_stage,
                pest_pressure,
                crop_density,
            }
        });

        return NextResponse.json(newPlant);
    } catch (error) {
        console.error('Error creating plant:', error);
        return NextResponse.error();
    }
}

export async function PUT(req: NextRequest) {
    try {
        const { id, plant, plantation_area, growth_stage, pest_pressure, crop_density } = await req.json();

        const updatedPlant = await prisma.crop_infos.update({
            where: {
                id,
            },
            data: {
                plant,
                plantation_area,
                growth_stage,
                pest_pressure,
                crop_density,
            }
        });

        return NextResponse.json(updatedPlant);
    } catch (error) {
        console.error('Error updating plant:', error);
        return NextResponse.error();
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { id } = await req.json();

        const deletedPlant = await prisma.crop_infos.delete({
            where: {
                id,
            }
        });

        return NextResponse.json(deletedPlant);
    } catch (error) {
        console.error('Error deleting plant:', error);
        return NextResponse.error();
    }
}