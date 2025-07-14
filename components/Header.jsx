'use client';

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import logo from '../public/logo.png';

export default function Header() {
    const pathname = usePathname();

    return (
        <header className="w-full bg-peach-600 rounded-b-2xl shadow-md">
            <nav className="max-w-screen-xl mx-auto flex items-center justify-between h-20 px-6 relative font-sans">

                {/* Left: Logo */}
                <div className="flex items-center gap-2">
                    <Image
                        src={logo}
                        width={48}
                        height={48}
                        alt="Logo"
                        className="rounded-full"
                    />
                </div>

                {/* Center: App Name (absolute center) */}
                <div className="absolute left-1/2 transform -translate-x-1/2">
                    <span className="font-semibold text-2xl tracking-wide text-melon-300">
                        E-Spam
                    </span>
                </div>

                {/* Right: Navigation Links */}
                <div className="flex gap-6">
                    <Link
                        href="/home"
                        className={`text-lg font-medium transition-colors ${
                            pathname === "/home"
                                ? "text-melon-300 underline underline-offset-4 decoration-melon-300"
                                : "text-seashell-700 hover:text-melon-300"
                        }`}
                    >
                        Home
                    </Link>
                    <Link
                        href="/explore"
                        className={`text-lg font-medium transition-colors ${
                            pathname === "/explore"
                                ? "text-melon-300 underline underline-offset-4 decoration-melon-300"
                                : "text-seashell-700 hover:text-melon-300"
                        }`}
                    >
                        Explore
                    </Link>
                </div>
            </nav>
        </header>
    );
}
