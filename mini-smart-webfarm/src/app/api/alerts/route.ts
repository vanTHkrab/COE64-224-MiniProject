// /app/api/sensor-alerts/route.ts หรือ /pages/api/sensor-alerts.ts
import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
    // กำหนดช่วงเวลาของวันปัจจุบัน
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    // ดึง sensor record ล่าสุดของวันนี้
    const sensorData = await prisma.sensor_datas.findFirst({
        where: {
            timestamp: {
                gte: today,
                lt: tomorrow,
            },
        },
        orderBy: {
            timestamp: "desc",
        },
    });

    // หากไม่มีข้อมูล sensor ของวันนี้
    if (!sensorData) {
        return NextResponse.json([]);
    }

    const messages: string[] = [];

    // ตรวจสอบแต่ละค่า หากค่าออกนอกช่วงที่กำหนดให้เพิ่มข้อความแจ้งเตือน
    if (
        sensorData.humidity !== null &&
        (sensorData.humidity < 30 || sensorData.humidity > 90)
    ) {
        messages.push(`Humidity is abnormal (${sensorData.humidity}%)`);
    }
    if (
        sensorData.ph !== null &&
        (sensorData.ph < 5.5 || sensorData.ph > 7.5)
    ) {
        messages.push(`pH is abnormal (${sensorData.ph})`);
    }
    if (
        sensorData.rainfall !== null &&
        (sensorData.rainfall < 1 || sensorData.rainfall > 30)
    ) {
        messages.push(`Rainfall is abnormal (${sensorData.rainfall}mm)`);
    }
    if (
        sensorData.soil_moisture !== null &&
        (sensorData.soil_moisture < 15 || sensorData.soil_moisture > 60)
    ) {
        messages.push(`Soil Moisture is abnormal (${sensorData.soil_moisture}%)`);
    }
    if (
        sensorData.frost_risk !== null &&
        sensorData.frost_risk > 0.5
    ) {
        messages.push(`Frost Risk is abnormal (${sensorData.frost_risk})`);
    }

    // หากทุกค่าปกติ messages จะเป็น array ว่าง
    return NextResponse.json(messages);
}
