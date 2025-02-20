import SignIn from "@/components/sign-in";
import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";


export default async function Home() {
    const session = await auth();
    console.log(session);

    return (

        <div className="flex container w-9/12">
            <div className="basis-1/2"></div>

            <div className="basis-1/2">

                <p className="text-lg font-semibold text-gray-700 mb-4 mt-32 text-center">Welcome to Our Platform</p>
                <div className="container mt-16 mx-auto p-10 bg-white rounded-xl shadow-2xl">
                    <SignIn />
                </div>
            </div>
        </div>
    );
}
