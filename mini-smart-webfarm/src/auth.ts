import NextAuth, { type DefaultSession} from "next-auth"
import Google from "next-auth/providers/google"
import { prisma } from "@/lib/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Credentials from "next-auth/providers/credentials"

class InvalidLoginError extends Error {
    constructor() {
        super("Invalid login")
        this.name = "InvalidLoginError"
    }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Google ({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        Credentials({
            credentials: {
                username: { label: "Username" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                console.log(credentials)
                throw new InvalidLoginError()
            },
        }),
    ],
    secret: process.env.AUTH_SECRET,
    callbacks: {
        authorized({ request, auth }) {
            const { pathname } = request.nextUrl
            if (pathname === "/middleware-example") return !!auth
            return true
        },
        async jwt({ token, user, account }) {
            if (account) {
                token.accessToken = <string>account.access_token;
            }
            return token;
        },
        async session({ session, token }) {
            if (token?.accessToken) session.accessToken = token.accessToken

            return session
        },
    },
    pages: {
        signIn: "/auth/signin",
        signOut: "/auth/signout",
        error: "/auth/error",
        verifyRequest: "/auth/verify-request",
    }
})

declare module "next-auth" {
    interface Session extends DefaultSession {
        accessToken: string
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken: string
    }
}