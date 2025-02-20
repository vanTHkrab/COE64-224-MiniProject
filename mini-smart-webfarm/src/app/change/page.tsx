"use client";
import { useRouter, usePathname } from "next/navigation";

export default function LanguageSwitcher() {
    const router = useRouter();
    const pathname = usePathname();
    const supportedLocales = ["en", "th"];

    const changeLanguage = (newLocale: string) => {
        const segments = pathname.split("/").filter(Boolean);

        if (segments.length > 0 && supportedLocales.includes(segments[0])) {
            segments[0] = newLocale;
        } else {
            segments.unshift(newLocale);
        }

        const newPathname = "/" + segments.join("/");
        router.push(newPathname);
    };

    return (
        <div>
            <button onClick={() => changeLanguage("en")}>English</button>
            <button onClick={() => changeLanguage("th")}>ไทย</button>
        </div>
    );
}
