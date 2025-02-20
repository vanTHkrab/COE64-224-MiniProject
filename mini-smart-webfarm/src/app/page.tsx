"use client";
// import SignIn from "@/components/sign-in";
// import UserDetail from "@/components/user-detail";
import { useTranslation } from "next-i18next";

export default function Home() {

    const { t } = useTranslation();

    return (

        <div className="flex container w-9/12">
            <div className="basis-1/2"></div>

            <div className="basis-1/2">

                <p className="text-lg font-semibold text-gray-700 mb-4 mt-32 text-center">{t('welcome')}</p>
                <div className="container mt-16 mx-auto p-10 bg-white rounded-xl shadow-2xl">
                    {/* {session ? <UserDetail /> : <SignIn />} */}
                </div>
            </div>
        </div>
    );
}
