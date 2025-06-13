import { IOCRService } from "../interface/services/ocrServiceInterface";
import { extractAadhaarDetails, extractAadhaarNumber, extractText } from "../utils/ocrHelper";

export class OcrService implements IOCRService {
    processAadhaarOCR = async (frontPath: string, backPath: string) => {
        const [frontText, backText] = await Promise.all([
            extractText(frontPath),
            extractText(backPath)
        ])
        const frontAadhaar = extractAadhaarNumber(frontText);
        const backAadhaar = extractAadhaarNumber(backText);
        const isValid = !!frontAadhaar ;
        const adharDetails= extractAadhaarDetails(frontText,backText)
        return {
            success: isValid,
            message: isValid ? "Valid Aadhaar card detected." : "Invalid Aadhaar card.",
            data: {
                frontText,
                backText,
                adharDetails,
                frontAadhaar,
                backAadhaar
            }
        };
    }
}