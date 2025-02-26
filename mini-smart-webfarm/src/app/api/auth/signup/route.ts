import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/utils/password";

export async function POST(req: NextRequest) {
    try {
        const { name, email, password } = await req.json();

        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 400 }
            );
        }

        const hashedPassword = await hashPassword(password);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            }
        });

        return NextResponse.json({ message: "User registered successfully!" });
    } catch (error) {
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}
