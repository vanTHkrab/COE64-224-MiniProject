import { auth } from "@/auth";
import SignIn from "@/components/sign-in";
import UserDetail from "@/components/user-detail";

export default async function Home() {
    const session = await auth();

    return (

        <div className="flex container w-9/12">
            <div className="basis-1/2"></div>

            <div className="basis-1/2">

                <p className="text-lg font-semibold text-gray-700 mb-4 mt-32 text-center">welcome</p>
                <div className="container mt-16 mx-auto p-10 bg-white rounded-xl shadow-2xl">
                     {session ? <UserDetail /> : <SignIn />}
                </div>
            </div>
        </div>
    );
}
