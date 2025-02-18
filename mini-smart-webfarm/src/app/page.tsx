import Image from "next/image";
import SignIn from "@/components/sign-in";
import SignOut from "@/components/signout-button";
import { auth } from "@/auth";

export default async function Home() {
    const session = await auth();

    if (session) {
        console.log(session);

        return (
            <div className="container mx-auto p-10 mt-20 shadow rounded-xl bg-white">
                <h1>Mini Smart Webfarm</h1>
                <p>Webfarm is a smart farm that uses IoT technology to monitor and control the farm.</p>
                <p className="text-sm">Welcome {session?.user?.name}</p>
                <br className="py-10"/>
                <div className="flex justify-center">
                </div>
                <SignOut />
            </div>
        );
    }

    return (
        <div className="container mx-auto p-10 mt-20 shadow rounded-xl bg-white">
            <h1>Mini Smart Webfarm</h1>
            <p>Webfarm is a smart farm that uses IoT technology to monitor and control the farm.</p>
            <br className="py-10"/>
            <div className="flex justify-center">
            </div>
            <SignIn />
        </div>

  );
}
