import { CheckCircle, Copy } from "lucide-react";
import React, { useState } from "react";

interface FiledProps{
    label:string;
    value:string;
    icon:any;
    isSensitive:boolean;
    copyable:boolean
}

const ResultField :React.FC<FiledProps>= ({ label, value, icon: Icon = false, copyable = true }) => {
    const [copiedField, setCopiedField] = useState('');
    const copyToClipboard = (text: string, fieldName: string) => {
        navigator.clipboard.writeText(text);
        setCopiedField(fieldName);
        setTimeout(() => setCopiedField(''), 2000);
    };

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3 flex-1">
                    <div className="bg-blue-50 p-2 rounded-lg">
                        <Icon className="w-5 h-5 text-blue-800" />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
                        <p className="text-lg font-semibold text-gray-900">{value}</p>
                    </div>
                </div>
                {copyable && (
                    <button
                        onClick={() => copyToClipboard(value, label)}
                        className="ml-2 p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        title="Copy to clipboard"
                    >
                        {copiedField === label ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                            <Copy className="w-4 h-4" />
                        )}
                    </button>
                )}
            </div>
        </div>
    )

};

export default ResultField