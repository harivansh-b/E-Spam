'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import espamImage from '../public/espam.jpeg';

// MOVE WORDS OUTSIDE
const words = ['Detect Spam', 'Filter Spam', 'Classify Spam', 'Protect Spam', 'Secure Spam'];

export default function Hero() {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isTyping, setIsTyping] = useState(true);
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
        const currentWord = words[currentWordIndex];

        if (isTyping) {
            if (currentText.length < currentWord.length) {
                const timeout = setTimeout(() => {
                    setCurrentText(currentWord.slice(0, currentText.length + 1));
                }, 150);
                return () => clearTimeout(timeout);
            } else {
                const timeout = setTimeout(() => {
                    setIsTyping(false);
                }, 2000);
                return () => clearTimeout(timeout);
            }
        } else {
            if (currentText.length > 0) {
                const timeout = setTimeout(() => {
                    setCurrentText(currentText.slice(0, -1));
                }, 100);
                return () => clearTimeout(timeout);
            } else {
                setCurrentWordIndex((prev) => (prev + 1) % words.length);
                setIsTyping(true);
            }
        }
    }, [currentText, isTyping, currentWordIndex]); // REMOVE words from dependency

    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor((prev) => !prev);
        }, 500);
        return () => clearInterval(cursorInterval);
    }, []);

    return (
        <div className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-16 py-8 md:py-12">
            {/* Left Content */}
            <div className="w-full md:w-1/2 space-y-4">
                <h1 className="text-5xl md:text-7xl font-bold font-nova-sans bg-gradient-to-r from-[#06beb6] via-[#48b1f3] to-[#845ec2] bg-clip-text text-transparent">
                    E-Spam
                </h1>

                <p className="text-lg md:text-xl text-primary-400 font-nova-sans max-w-lg">
                    Advanced spam detection and email filtering system using Naive Bayes MultinomialNB Model
                </p>

                <div className="text-2xl md:text-4xl font-semibold font-nova-sans h-16 flex items-center">
                    <span className="bg-gradient-to-r from-[#ff6a00] via-[#ee0979] to-[#ff6a00] bg-clip-text text-transparent">
                        {currentText}
                    </span>
                    <span
                        className={`inline-block w-1 h-10 md:h-12 bg-[#06beb6] ml-2 ${
                            showCursor ? 'opacity-100' : 'opacity-0'
                        } transition-opacity duration-100`}
                    />
                </div>
            </div>

            {/* Right Image */}
            <div className="w-full md:w-1/2 flex justify-center md:justify-end mb-6 md:mb-0">
                <Image
                    src={espamImage}
                    alt="E-Spam Illustration"
                    width={400}
                    height={400}
                    className="w-full max-w-md md:max-w-lg object-contain rounded-xl"
                    priority
                />
            </div>
        </div>
    );
}
