import React, { useState } from 'react';
import { User, CreditCard, MapPin, Calendar, Phone, Eye, EyeOff,  CheckCircle, UserCheck } from 'lucide-react';
import ResultField from '../components/ResultField';
import type { AadhaarDetails } from '../types/types';

interface Props {
    extractedData: AadhaarDetails|null;
}
const AadhaarResult: React.FC<Props> = ({ extractedData }) => {
    const [showSensitiveData, setShowSensitiveData] = useState(false);


    const data = extractedData;

    const maskAadhaar = (aadhaar: string) => {
        if (!showSensitiveData) {
            return `XXXX XXXX ${aadhaar.slice(-4)}`;
        }
        return aadhaar;
    };

    const maskPhone = (phoneNumber: string) => {
        if (!showSensitiveData) {
            return `+91 XXXXX ${phoneNumber.slice(-5)}`;
        }
        return phoneNumber;
    };


    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="bg-green-100 p-4 rounded-full">
                            <CheckCircle className="w-12 h-12 text-green-600" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Aadhaar Details Extracted</h1>
                    <p className="text-gray-600">OCR processing completed successfully</p>
                </div>

                {/* Processing Stats */}


                {/* Privacy Toggle */}
                <div className="flex justify-center mb-6">
                    <button
                        onClick={() => setShowSensitiveData(!showSensitiveData)}
                        className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors"
                    >
                        {showSensitiveData ? (
                            <EyeOff className="w-4 h-4" />
                        ) : (
                            <Eye className="w-4 h-4" />
                        )}
                        <span className="text-sm font-medium">
                            {showSensitiveData ? 'Hide' : 'Show'} Sensitive Data
                        </span>
                    </button>
                </div>

                {/* Extracted Information */}
                <div className="space-y-8">
                    {/* Personal Information */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                            <User className="w-5 h-5 mr-2 text-blue-800" />
                            Personal Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <ResultField
                                label="Full Name"
                                value={data?.fullName??""}
                                icon={UserCheck}
                                isSensitive={false}
                                copyable={true}
                            />
                            <ResultField
                                label="Aadhaar Number"
                                value={maskAadhaar(data?.aadhaarNumber??"")}
                                icon={CreditCard}
                                isSensitive={true}
                                copyable={true}
                            />
                            <ResultField
                                label="Date of Birth"
                                value={data?.dob??""}
                                icon={Calendar}
                                isSensitive={false}
                                copyable={true}
                            />
                            <ResultField
                                label="Gender"
                                value={data?.gender??""}
                                icon={User}
                                isSensitive={false}
                                copyable={true}
                            />
                            {data?.fatherName ? (
                                <ResultField
                                    label="Father's Name"
                                    value={data?.fatherName}
                                    icon={User}
                                    isSensitive={false}
                                    copyable={true}
                                />
                            ) : ("")}

                        </div>
                    </div>

                    {/* Address Information */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                            <MapPin className="w-5 h-5 mr-2 text-blue-800" />
                            Address
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <ResultField
                                    label="Address"
                                    value={data?.address??""}
                                    icon={MapPin}
                                    copyable={true}
                                    isSensitive={false}
                                />
                            </div>

                            <ResultField
                                label="PIN Code"
                                value={data?.pinCode??""}
                                icon={MapPin}
                                isSensitive={false}
                                copyable={true}
                            />
                            {data?.phoneNumber ? (
                                <ResultField
                                    label="Phone Number"
                                    value={maskPhone(data.phoneNumber)}
                                    icon={Phone}
                                    isSensitive={true}
                                    copyable={true}
                                />
                            ) : ("")}

                        </div>
                    </div>
                </div>

            

                {/* Security Notice */}
                <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-800 mb-2">Security Notice</h4>
                    <p className="text-sm text-yellow-700">
                        Your Aadhaar data is processed securely and not stored on our servers.
                        Please verify all extracted information for accuracy before use.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AadhaarResult;