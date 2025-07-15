'use client';

import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import React from "react";

export default function InputArea({ message, setMessage }) {
    return (
        <div className="grid w-full gap-4 px-4 max-w-lg mx-auto font-sans">
            <Label
                htmlFor="message"
                className="text-base font-semibold text-primary-200 flex items-center gap-2"
            >
                <div className="w-1 h-5 bg-primary-500 rounded-full"></div>
                Your message
            </Label>
            <div className="relative">
                <Textarea
                    id="message"
                    placeholder="Type your message here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="min-h-[10rem] rounded-xl border-2 border-primary-400/60 bg-tertiary-800 placeholder-primary-400/70 text-primary-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30 focus:bg-tertiary-700 transition-all duration-300 resize-none shadow-sm hover:border-primary-500/80 hover:shadow-md"
                />
                <div className="absolute bottom-3 right-3 text-xs text-primary-400/60 pointer-events-none">
                    {message.length} characters
                </div>
            </div>
        </div>
    );
}