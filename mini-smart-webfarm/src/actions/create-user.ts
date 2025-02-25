import {prisma} from "@/lib/prisma";
import { hashPassword } from "@/utils/password";

export const createUser = async (name:string, email: string, password: string) => {
    const hashedPassword = await hashPassword(password);
    return prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    });
}