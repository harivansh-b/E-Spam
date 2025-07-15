'use client';
import { useState } from 'react';
import { Copy, FileText, Download, Monitor, Smartphone } from 'lucide-react';

export default function HowToInput() {
    const [activeMethod, setActiveMethod] = useState(0);

    const inputMethods = [
        {
            id: 'copy-paste',
            title: 'Copy & Paste',
            description: 'Simply copy your email content and paste it directly into our analyzer',
            icon: Copy,
            availability: 'Available on all devices',
            steps: [
                'Select and copy your email content',
                'Paste it into the text area',
                'Click analyze to get results'
            ],
            gradient: 'from-[#06beb6] to-[#48b1f3]'
        },
        {
            id: 'pdf-upload',
            title: 'PDF Upload',
            description: 'Upload your email saved as a PDF file for analysis',
            icon: FileText,
            availability: 'Available on all devices',
            steps: [
                'Save your email as PDF',
                'Click upload or drag & drop',
                'Wait for processing and analysis'
            ],
            gradient: 'from-[#ff6a00] to-[#ee0979]'
        },
        {
            id: 'eml-upload',
            title: 'EML File Upload',
            description: 'Upload raw email files (.eml) for comprehensive analysis',
            icon: Download,
            availability: 'Desktop version only',
            steps: [
                'Download email as .eml file',
                'Upload the file to our system',
                'Get detailed spam analysis'
            ],
            gradient: 'from-[#845ec2] to-[#06beb6]',
            isDesktopOnly: true
        }
    ];

    return (
        <section className="px-6 md:px-16 py-16 bg-gradient-to-br from-gray-50 to-white">
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold font-nova-sans mb-4">
                        <span className="bg-gradient-to-r from-[#06beb6] via-[#48b1f3] to-[#845ec2] bg-clip-text text-transparent">
                            How to Input
                        </span>
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 font-nova-sans max-w-2xl mx-auto">
                        Choose from three convenient methods to analyze your emails for spam detection
                    </p>
                </div>

                {/* Method Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    {inputMethods.map((method, index) => {
                        const IconComponent = method.icon;
                        return (
                            <div
                                key={method.id}
                                className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                                    activeMethod === index
                                        ? 'border-transparent bg-white shadow-xl'
                                        : 'border-gray-200 bg-white/50 hover:border-gray-300'
                                }`}
                                onClick={() => setActiveMethod(index)}
                            >
                                {/* Gradient Border for Active Card */}
                                {activeMethod === index && (
                                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${method.gradient} p-0.5`}>
                                        <div className="rounded-2xl bg-white h-full w-full"></div>
                                    </div>
                                )}
                                
                                <div className="relative z-10">
                                    {/* Icon */}
                                    <div className={`w-16 h-16 rounded-xl mb-4 flex items-center justify-center bg-gradient-to-r ${method.gradient}`}>
                                        <IconComponent className="w-8 h-8 text-white" />
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl font-bold font-nova-sans mb-2 text-gray-800">
                                        {method.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-gray-600 font-nova-sans text-sm mb-3">
                                        {method.description}
                                    </p>

                                    {/* Availability */}
                                    <div className="flex items-center gap-2 text-sm">
                                        {method.isDesktopOnly ? (
                                            <Monitor className="w-4 h-4 text-gray-500" />
                                        ) : (
                                            <div className="flex gap-1">
                                                <Monitor className="w-4 h-4 text-gray-500" />
                                                <Smartphone className="w-4 h-4 text-gray-500" />
                                            </div>
                                        )}
                                        <span className={`font-medium ${method.isDesktopOnly ? 'text-orange-600' : 'text-green-600'}`}>
                                            {method.availability}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Detailed Steps */}
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                    <div className="flex items-center gap-4 mb-6">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-r ${inputMethods[activeMethod].gradient}`}>
                            {(() => {
                                const IconComponent = inputMethods[activeMethod].icon;
                                return <IconComponent className="w-6 h-6 text-white" />;
                            })()}
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold font-nova-sans text-gray-800">
                                {inputMethods[activeMethod].title}
                            </h3>
                            <p className="text-gray-600 font-nova-sans">
                                Follow these simple steps
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {inputMethods[activeMethod].steps.map((step, index) => (
                            <div key={index} className="flex items-start gap-4">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm bg-gradient-to-r ${inputMethods[activeMethod].gradient}`}>
                                    {index + 1}
                                </div>
                                <div>
                                    <p className="text-gray-700 font-nova-sans">
                                        {step}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Desktop Only Notice */}
                    {inputMethods[activeMethod].isDesktopOnly && (
                        <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                            <div className="flex items-center gap-2 text-orange-700">
                                <Monitor className="w-5 h-5" />
                                <span className="font-medium font-nova-sans">
                                    Desktop Version Only
                                </span>
                            </div>
                            <p className="text-sm text-orange-600 mt-1 font-nova-sans">
                                EML file upload is currently available only on desktop devices for enhanced file processing capabilities.
                            </p>
                        </div>
                    )}
                </div>


            </div>
        </section>
    );
}