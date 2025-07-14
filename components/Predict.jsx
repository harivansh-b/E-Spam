"use client";

import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

export default function Predict({ message }) {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const predict = async () => {
        if (!message.trim()) {
            setResult(null);
            return;
        }

        setLoading(true);
        try {
            const response = await fetch("http://127.0.0.1:5000/api/predict", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: message }),
            });

            const data = await response.json();
            if (response.ok) {
                setResult(data.label);
            } else {
                setResult(`Error: ${data.error}`);
            }
        } catch (error) {
            setResult(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    // Auto-predict on message change
    useEffect(() => {
        if (!message.trim()) {
            setResult(null);
            return;
        }
        predict();
    }, [message]);

    return (
        <div className="flex flex-col items-center justify-center py-6 font-sans">
            <Card className="w-full max-w-md rounded-2xl shadow-lg border bg-[--color-seashell-500]">
                <CardContent className="flex flex-col space-y-5 p-6">
                    <h2 className="text-center text-2xl font-semibold text-melon-400">
                        Prediction Result
                    </h2>
                    {loading ? (
                        <p className="text-center text-[--color-melon-300] font-medium">
                            Predicting...
                        </p>
                    ) : result ? (
                        <p
                            className={`text-center text-lg font-bold ${
                                result === "Spam"
                                    ? "text-red-600"
                                    : result === "Not spam"
                                    ? "text-green-600"
                                    : "text-gray-600"
                            }`}
                        >
                            {result}
                        </p>
                    ) : (
                        <p className="text-center text-gray-500">
                            Enter or upload an email to predict.
                        </p>
                    )}
                    <Button
                        onClick={predict}
                        disabled={loading || !message.trim()}
                        className="bg-melon-400 hover:bg-melon-300 text-white rounded-xl transition"
                    >
                        {loading ? "Predicting..." : "Predict Again"}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
