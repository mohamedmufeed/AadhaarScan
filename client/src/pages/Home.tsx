
import { Upload, Scan, Zap, FileText, CheckCircle, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import ProcessStep from '../components/ProcessStep';
import AdharInput from '../components/AdharInput';
import AadhaarResult from '../components/AdahrResult';
import { useRef, useState } from 'react';
import type { AadhaarDetails } from '../types/types';



const Home = () => {
  const resultRef = useRef<HTMLDivElement | null>(null);
  const [isDone, setIsDone] = useState<boolean | null>(null)
  const [details, setAdharDetails] = useState<AadhaarDetails | null>(null)
  const handleFromChild = (data: AadhaarDetails) => {
    setAdharDetails(data)
  }

  const handleProcess = (value: boolean) => {
    setIsDone(value)
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }


  return (
    <div className="min-h-screen via-blue-50 to-indigo-100">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" />
        <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                <Zap className="w-4 h-4" />
                <span>AI-Powered OCR Technology</span>
              </div>

              <h1 className="text-5xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Instantly Extract
                <span className=" bg-gradient-to-r from-blue-800 to-indigo-900 bg-clip-text text-transparent">
                  Aadhaar Details
                </span>
                with Just a Scan
              </h1>

              <p className="text-md text-gray-600 leading-relaxed max-w-xl">
                Upload your Aadhaar card images and let our advanced OCR engine extract all details with military-grade security. Fast, accurate, and completely private.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-blue-900 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2">
                  <span>Start Scanning Now</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-600">99.9% Accuracy</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-600">Bank-Grade Security</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-600">Instant Results</span>
                </div>
              </div>
            </div>
            { /* input field  */}
            <div className="relative">
              <AdharInput handleFromChild={handleFromChild} isProcess={handleProcess} />
            </div>

          </div>
        </div>
      </section>

      {/* result */}
      <section id='result' ref={resultRef}>
        {isDone && <AadhaarResult extractedData={details}  />}

      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-md text-gray-600 max-w-2xl mx-auto">
              Our streamlined process makes Aadhaar data extraction effortless in just three simple steps.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-12">
            <ProcessStep
              number="1"
              title="Upload Images"
              description="Select and upload clear images of both the front and back of your Aadhaar card. Our system accepts JPG, PNG, and PDF formats."
              icon={Upload}
            />
            <ProcessStep
              number="2"
              title="AI Processing"
              description="Our advanced OCR engine analyzes the images using machine learning to identify and extract all text fields with high precision."
              icon={Scan}
            />
            <ProcessStep
              number="3"
              title="Get Structured Data"
              description="Receive all extracted details in a clean, organized format including name, Aadhaar number, address, DOB, and more."
              icon={FileText}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;