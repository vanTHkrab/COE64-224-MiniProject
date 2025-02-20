import React from 'react';
import Link from "next/link";

function Header() {
    return (
        <header>
            <ul>
                <li>
                    <Link href="/">
                        Home
                    </Link>
                </li>
            </ul>
        </header>
    );
}

export default Header;