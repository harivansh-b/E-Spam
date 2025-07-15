'use client';

import React, { useState } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Image from 'next/image';
import pdfIcon from '../public/pdf.png';
import emlIcon from '../public/eml.png';

const MAX_SIZE_MB = 32;

export default function FileUpload({ message, setMessage }) {
    const [uploadedFile, setUploadedFile] = useState(null);
    const [error, setError] = useState('');
    const [hasUploaded, setHasUploaded] = useState(false);
    const [isDragOver, setIsDragOver] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = async (e) => {
        const files = e.target.files || e.dataTransfer?.files;
        if (!files || files.length === 0) return;

        const file = files[0];
        const isValidType =
            file.type === 'application/pdf' ||
            file.name.endsWith('.pdf') ||
            file.name.endsWith('.eml');
        const isValidSize = file.size <= MAX_SIZE_MB * 1024 * 1024;

        if (!isValidType) {
            setError('Only PDF or EML files are allowed.');
            setUploadedFile(null);
            return;
        }
        if (!isValidSize) {
            setError('File size exceeds 32MB.');
            setUploadedFile(null);
            return;
        }

        setIsUploading(true);
        setError('');

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('https://e-spam.onrender.com/api/upload', {
                method: 'POST',
                body: formData,
                credentials: 'include',
            });

            const data = await response.json();

            if (!response.ok) {
                setError(`Upload failed: ${data.error || 'Server error'}`);
                setUploadedFile(null);
                setHasUploaded(false);
            } else {
                setUploadedFile(file);
                setHasUploaded(true);
                setMessage(data.message || '');
            }
        } catch (err) {
            console.error(err);
            setError('Failed to upload. Please try again.');
            setUploadedFile(null);
            setHasUploaded(false);
        } finally {
            setIsUploading(false);
        }
    };

    const removeFile = () => {
        setUploadedFile(null);
        setHasUploaded(false);
        setError('');
        setMessage('');
        const fileInput = document.getElementById('dropzone-file');
        if (fileInput) fileInput.value = null;
    };

    const getIcon = () => {
        if (!uploadedFile) return null;
        if (uploadedFile.name.endsWith('.pdf')) return pdfIcon;
        if (uploadedFile.name.endsWith('.eml')) return emlIcon;
        return null;
    };

    return (
        <div className="flex justify-center py-8 px-4">
            <div className="w-full max-w-lg">
                <label
                    htmlFor="dropzone-file"
                    className={`flex flex-col justify-center items-center w-full min-h-[16rem] border-2 rounded-xl transition-all duration-300 ${
                        hasUploaded 
                            ? 'bg-tertiary-700 cursor-not-allowed border-tertiary-400' 
                            : isDragOver 
                                ? 'bg-primary-800 border-primary-500 border-solid shadow-lg' 
                                : 'bg-tertiary-800 border-primary-400 border-dashed cursor-pointer hover:bg-tertiary-700 hover:border-primary-500 hover:shadow-md'
                    }`}
                    onClick={(e) => hasUploaded && e.preventDefault()}
                    onDragOver={(e) => { e.preventDefault(); if (!hasUploaded) setIsDragOver(true); }}
                    onDragLeave={(e) => { e.preventDefault(); if (!hasUploaded) setIsDragOver(false); }}
                    onDrop={(e) => {
                        e.preventDefault();
                        if (!hasUploaded) {
                            setIsDragOver(false);
                            const file = e.dataTransfer.files?.[0];
                            if (file) handleFileChange({ target: { files: [file] } });
                        }
                    }}
                >
                    {isUploading ? (
                        <div className="flex flex-col items-center space-y-2">
                            <Skeleton circle width={50} height={50} />
                            <Skeleton width={180} height={16} />
                            <Skeleton width={100} height={12} />
                        </div>
                    ) : uploadedFile ? (
                        <div className="flex items-center justify-between w-full bg-white rounded-lg px-4 py-3 shadow-md border border-primary-300/20">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 flex items-center justify-center border border-primary-300 rounded-lg bg-primary-900/50">
                                    <Image src={getIcon()} alt="icon" width={24} height={24} />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-primary-200 truncate max-w-[10rem]">
                                        {uploadedFile.name}
                                    </p>
                                    <p className="text-xs text-primary-300">
                                        {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
                                    </p>
                                </div>
                            </div>
                            <button 
                                onClick={removeFile}
                                className="p-1 rounded-full hover:bg-secondary-800 transition-colors duration-200"
                            >
                                <TrashIcon className="w-5 h-5 text-secondary-500 hover:text-secondary-400" />
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center space-y-2">
                            <div className="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center">
                                <svg className="w-6 h-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M12 4v12m0 0l-3.5-3.5M12 16l3.5-3.5M20.25 16.5A3.75 3.75 0 0016.5 12.75H7.5a3.75 3.75 0 00-3.75 3.75v.75A3.75 3.75 0 007.5 21h9a3.75 3.75 0 003.75-3.75v-.75z"
                                    />
                                </svg>
                            </div>
                            <p className="text-sm text-primary-300 font-medium">Click to upload or drag and drop</p>
                            <p className="text-xs text-primary-400">PDF or EML only (max 32MB)</p>
                        </div>
                    )}
                    {error && (
                        <div className="mt-3 px-3 py-2 bg-secondary-900/80 border border-secondary-600 rounded-lg">
                            <p className="text-sm text-secondary-400 font-medium">{error}</p>
                        </div>
                    )}
                    <input
                        id="dropzone-file"
                        type="file"
                        accept=".pdf,.eml,application/pdf,message/rfc822"
                        className="hidden"
                        disabled={hasUploaded}
                        onChange={handleFileChange}
                    />
                </label>
            </div>
        </div>
    );
}