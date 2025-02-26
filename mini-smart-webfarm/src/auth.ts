import NextAuth, { DefaultSession } from "next-auth";
import Google from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import { ZodError } from "zod";
import { signInSchema } from "@/lib/zod";
import { verifyPassword } from "@/utils/password";

class InvalidLoginError extends Error {
    constructor() {
        super("Invalid login");
        this.name = "InvalidLoginError";
    }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt",
        maxAge: 60 * 60,
    },
    debug: true,
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        Credentials({
            name: "Credentials",
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                try {
                    const { email, password } = await signInSchema.parseAsync(credentials);

                    console.log("🔍 Authenticating:", email);

                    const user = await prisma.user.findUnique({
                        where: { email },
                    });

                    console.log("👤 Found user:", user);

                    if (!user || user.password === null) {
                        console.log("❌ User not found or missing password");
                        throw new InvalidLoginError();
                    }

                    const isValid = await verifyPassword(password, user.password);

                    if (!isValid) {
                        console.log("❌ Invalid password");
                        throw new InvalidLoginError();
                    }

                    return user;
                } catch (error) {
                    if (error instanceof ZodError) {
                        throw new InvalidLoginError();
                    }
                    throw error;
                }
            },
        }),
    ],
    secret: process.env.AUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = <string>user.id;
                token.email = <string>user.email;
                token.name = <string>user.name;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.email = token.email;
                session.user.name = token.name;
            }
            return session;
        },
    },
    pages: {
        signIn: "/signin",
        signOut: "/signout",
        error: "/error",
        verifyRequest: "/verify-request",
        newUser: "/new-user",
    },
});

declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            id: string;
            email: string;
            name?: string;
            image?: string;
        };
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        email: string;
        name?: string;
        image?: string;
    }
}
