import NextAuth, { type DefaultSession } from "next-auth";
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
    debug: false,
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
                    const { email, password } = await signInSchema.parseAsync(credentials)

                    console.log(email + " " + password);

                    const user = await prisma.user.findUnique({
                        where: { email },
                    });

                    console.log(user);

                    if (!user) {
                        console.log("User not found");
                        throw new InvalidLoginError();
                    }

                    if(user.password === null) {
                        throw new InvalidLoginError();
                    }

                    const isValid = await verifyPassword(password, user.password);

                    if (!isValid) {
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
        authorized({ request, auth }) {
            const { pathname } = request.nextUrl;
            if (pathname === "/middleware-example") return !!auth;
            return true;
        },
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = <string>account.access_token;
            }
            return token;
        },
        async session({ session, token }) {
            if (token?.accessToken) session.accessToken = token.accessToken;
            return session;
        },
    },
    experimental: {
        enableWebAuthn: false,
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
        accessToken: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken: string;
    }
}
