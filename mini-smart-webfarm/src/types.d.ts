declare module "next-auth" {
    /**
     * The shape of the user object returned in the OAuth providers' `profile` callback,
     * or the second parameter of the `session` callback, when using a database.
     */
    interface User {
        id: number
        name: string
        email: string
        image: string

    }
    /**
     * The shape of the account object returned in the OAuth providers' `account` callback,
     * Usually contains information about the provider being used, like OAuth tokens (`access_token`, etc).
     */
    interface Account {
        provider: string
        type: "oauth" | "email"
        id: string
        refreshToken: string
        accessToken: string
        accessTokenExpires: number
    }

    /**
     * Returned by `useSession`, `auth`, contains information about the active session.
     */
    interface Session {
        user: User
        account: Account
        expires: string
    }
}

// The `JWT` interface can be found in the `next-auth/jwt` submodule
import { JWT } from "next-auth/jwt"

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
    interface JWT {
        /** OpenID ID Token */
        idToken?: string
    }
}