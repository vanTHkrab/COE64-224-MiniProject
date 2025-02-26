declare module "next-auth" {
    interface User {
        id: string;
        name: string;
        email: string;
        image?: string;
    }

    interface Session {
        user: User;
        expires: string;
        accessToken?: string;
    }
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        email: string;
        name?: string;
        accessToken?: string;
        refreshToken?: string;
        idToken?: string;
    }
}
