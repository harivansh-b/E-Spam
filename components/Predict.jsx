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

    const getResultColor = () => {
        if (result === "Spam") return "text-secondary-400";
        if (result === "Not spam") return "text-primary-400";
        return "text-quaternary-400";
    };

    const getResultBg = () => {
        if (result === "Spam") return "bg-secondary-900/30 border-secondary-600/50";
        if (result === "Not spam") return "bg-primary-900/30 border-primary-600/50";
        return "bg-quaternary-900/30 border-quaternary-600/50";
    };

    return (
        <div className="flex flex-col items-center justify-center py-6 font-sans">
            <Card className="w-full max-w-md rounded-2xl shadow-lg border-2 border-primary-400/30 bg-tertiary-800 backdrop-blur-sm">
                <CardContent className="flex flex-col space-y-6 p-6">
                    <div className="text-center">
                        <div className="inline-flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                            <h2 className="text-2xl font-bold text-primary-200">
                                Prediction Result
                            </h2>
                            <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                        </div>
                    </div>
                    
                    <div className="min-h-[4rem] flex items-center justify-center">
                        {loading ? (
                            <div className="flex items-center gap-3">
                                <div className="w-5 h-5 border-2 border-primary-400 border-t-transparent rounded-full animate-spin"></div>
                                <p className="text-primary-300 font-medium">
                                    Analyzing...
                                </p>
                            </div>
                        ) : result ? (
                            <div className={`px-4 py-2 rounded-lg border-2 ${getResultBg()}`}>
                                <p className={`text-lg font-bold ${getResultColor()}`}>
                                    {result}
                                </p>
                            </div>
                        ) : (
                            <p className="text-center text-primary-400/70 italic">
                                Enter or upload an email to predict.
                            </p>
                        )}
                    </div>
                    
                    <Button
                        onClick={predict}
                        disabled={loading || !message.trim()}
                        className="bg-gradient-to-r from-primary-500 to-primary-400 hover:from-primary-400 hover:to-primary-300 disabled:from-primary-600 disabled:to-primary-600 disabled:opacity-50 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 shadow-md hover:shadow-lg"
                    >
                        {loading ? (
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Analyzing...
                            </div>
                        ) : (
                            "Predict Again"
                        )}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}