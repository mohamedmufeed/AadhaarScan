import type React from "react";
import type { ProcessProps } from "../types/types";

const ProcessStep:React.FC<ProcessProps> = ({ number, title, description, icon: Icon }) => {
  return (
    <div className="flex items-start space-x-4 group">
      <div className="flex-shrink-0">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg group-hover:shadow-xl transition-shadow duration-300">
          {number}
        </div>
      </div>
      <div className="flex-1">
        <div className="flex items-center space-x-2 mb-2">
          <Icon className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default ProcessStep