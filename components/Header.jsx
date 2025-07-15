'use client';

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import logo from '../public/logo.png';

export default function Header() {
    const pathname = usePathname();

    return (
        <header className="w-full bg-gradient-to-r from-primary-500 to-primary-400 rounded-b-2xl shadow-lg border-b border-primary-300/20">
            <nav className="max-w-screen-xl mx-auto flex items-center justify-between h-20 px-6 relative font-sans">
                
                {/* Left: Logo */}
                <div className="flex items-center gap-2">
                    <div className="p-1 bg-white/20 rounded-full backdrop-blur-sm">
                        <Image
                            src={logo}
                            width={48}
                            height={48}
                            alt="Logo"
                        />
                    </div>
                </div>

                {/* Center: App Name (absolute center) */}
                <div className="absolute left-1/2 transform -translate-x-1/2">
                    <span className="font-bold text-2xl tracking-wide text-white drop-shadow-md">
                        E-Spam
                    </span>
                </div>

                {/* Right: Navigation Links */}
                <div className="flex gap-6">
                    <Link
                        href="/home"
                        className={`text-lg font-medium transition-all duration-300 ${
                            pathname === "/home"
                                ? "text-white underline underline-offset-4 decoration-2 decoration-white shadow-sm"
                                : "text-primary-100 hover:text-white hover:scale-105"
                        }`}
                    >
                        Home
                    </Link>
                    <Link
                        href="/explore"
                        className={`text-lg font-medium transition-all duration-300 ${
                            pathname === "/explore"
                                ? "text-white underline underline-offset-4 decoration-2 decoration-white shadow-sm"
                                : "text-primary-100 hover:text-white hover:scale-105"
                        }`}
                    >
                        Explore
                    </Link>
                </div>
            </nav>
        </header>
    );
}