import React, { useState } from 'react'
import { processAadhaarOCR } from '../service/ocrService';
import { CheckCircle, Upload } from 'lucide-react';
import type { AadhaarDetails } from '../types/types';
interface Props{
    handleFromChild:(data:AadhaarDetails)=>void
    isProcess:(value:boolean)=>void
}

const AdharInput:React.FC<Props> = ({handleFromChild ,isProcess}) => {
    const MAX_FILE_SIZE_MB = 2;
    const [error, setError] = useState("")
    const [uploadHover, setUploadHover] = useState(false);
    const [loading, setLoading] = useState(false)
    const [selectedFiles, setSelectedFiles] = useState<{ front: File | null; back: File | null }>({
        front: null,
        back: null,
    });
    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>, side: string) => {
        const file = event.target.files?.[0];
        if (!file) return;
        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"]
        if (!allowedTypes.includes(file.type)) {
            setError("Only JPG or PNG files are allowed.");
            return;
        }

        const fileSizeInMb = file.size / (1024 * 1024)
        if (fileSizeInMb > MAX_FILE_SIZE_MB) {
            setError(`File size must be under ${MAX_FILE_SIZE_MB} MB.`);
            return;
        }

        setSelectedFiles(prev => ({ ...prev, [side]: file }));

    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>, side: string) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            setSelectedFiles(prev => ({ ...prev, [side]: file }));
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };


    const handleProcess = async () => {
        try {
            const formData = new FormData();

            if (selectedFiles.front) {
                formData.append("front", selectedFiles.front);
            } else {
                console.error("Front file is missing");
                return;
            }

            if (selectedFiles.back) {
                formData.append("back", selectedFiles.back);
            } else {
                console.error("Back file is missing");
                return;
            }
            setLoading(true)
            const response = await processAadhaarOCR(formData);
            if (response.success) {
                console.log("OCR Response:", response);
                isProcess(response.success)
                 handleFromChild(response.data.adharDetails);
                setSelectedFiles({ front: null, back: null });
            } else {
                setError(response.message)
            }
        } catch (error) {
            console.error("Error during OCR processing:", error);
        }
        finally {
            setLoading(false)
        }
    };
    return (
        <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-6 transform hover:scale-105 transition-transform duration-500">
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Upload Aadhaar Images</h3>
            <div className='flex justify-center'>
                {error && <p className='text-red-400'> {error}</p>}
            </div>
            {/* Front Side Upload */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Front Side</label>
                <div
                    className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 cursor-pointer ${selectedFiles.front
                        ? 'border-green-400 bg-green-50'
                        : uploadHover
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50'
                        }`}
                    onMouseEnter={() => setUploadHover(true)}
                    onMouseLeave={() => setUploadHover(false)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, 'front')}
                   onClick={() => document.getElementById('front-upload')!.click()}

                >
                    {selectedFiles.front ? (
                        <div className="flex items-center justify-center space-x-2">
                            <CheckCircle className="w-6 h-6 text-green-500" />
                            <span className="text-green-700 font-medium">{selectedFiles.front?.name}</span>
                        </div>
                    ) : (
                        <>
                            <Upload className={`w-8 h-8 mx-auto mb-2 transition-colors duration-300 ${uploadHover ? 'text-blue-600' : 'text-gray-400'}`} />
                            <p className="text-sm text-gray-600">Drop front image here or click to browse</p>
                        </>
                    )}
                    <input
                        id="front-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileSelect(e, 'front')}
                    />
                </div>
            </div>

            {/* Back Side Upload */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Back Side</label>
                <div
                    className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 cursor-pointer ${selectedFiles.back
                        ? 'border-green-400 bg-green-50'
                        : 'border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50'
                        }`}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, 'back')}
                    onClick={() => document.getElementById('back-upload')!.click()}
                >
                    {selectedFiles.back ? (
                        <div className="flex items-center justify-center space-x-2">
                            <CheckCircle className="w-6 h-6 text-green-500" />
                            <span className="text-green-700 font-medium">{selectedFiles.back.name}</span>
                        </div>
                    ) : (
                        <>
                            <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                            <p className="text-sm text-gray-600">Drop back image here or click to browse</p>
                        </>
                    )}
                    <input
                        id="back-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileSelect(e, 'back')}
                    />
                </div>
            </div>

            {/* Process Button */}
            <button
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${selectedFiles.front && selectedFiles.back
                    ? ' bg-blue-900 text-white hover:shadow-lg transform hover:scale-105'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                disabled={!selectedFiles.front || !selectedFiles.back}
                onClick={handleProcess}
            >
                {selectedFiles.front && selectedFiles.back ? (

                    loading ? (
                        <span> Processing...</span>
                    ) : (
                        <span className="flex items-center justify-center space-x-2">
                            <span>Process Aadhaar Card</span>
                        </span>
                    )
                ) : (
                    'Select both images to continue'
                )}
            </button>

            {/* File Requirements */}
            <div className="mt-4 text-xs text-gray-500 text-center">
                <p>Supported formats: JPG, PNG, JPEG • Max size: 2MB each</p>
                <p>Ensure images are clear and all text is readable</p>
            </div>
        </div >

    )
}

export default AdharInput