'use client';

import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import React from "react";

export default function InputArea({ message, setMessage }) {
    return (
        <div className="grid w-full gap-3 px-4 max-w-lg mx-auto font-sans">
            <Label
                htmlFor="message"
                className="text-base font-semibold text-pale-dogwood-300"
            >
                Your message
            </Label>
            <Textarea
                id="message"
                placeholder="Type your message here."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[10rem] rounded-xl border border-pale-dogwood-400 bg-seashell-500 placeholder-gray-400 focus:border-pale-dogwood-300 focus:ring-2 focus:ring-pale-dogwood-300 transition"
            />
        </div>
    );
}
