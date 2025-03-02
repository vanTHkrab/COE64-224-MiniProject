import React from 'react';
import SignOut from "@/components/signout-button";
import { auth } from "@/auth";

export default async function UserDetail() {
    const session = await auth();
    console.log(session);
    return (
        <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">User Detail</h2>
            <p className="text-gray-500">Welcome to our platform</p>
            <p className={"text-gray-500"}>You are logged in name: {session?.user.name}</p>
                <SignOut />
        </div>
    );
};

//
