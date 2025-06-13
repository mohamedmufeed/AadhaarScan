import path from "path"
import Tesseract from "tesseract.js"
import { AadhaarDetails } from "../types/ocr"

export const extractText=async(imagePath:string)=>{
    const result=await Tesseract.recognize(path.resolve(imagePath),"eng")
    return result.data.text
}
export const extractAadhaarNumber = (text: string): string | null => {
    const regex = /\b\d{4}\s?\d{4}\s?\d{4}\b/;
    const match = text.match(regex);
    return match ? match[0] : null;
};



 export const extractAadhaarDetails=(frontText: string, backText: string)=>{
  const nameMatch = frontText.match(/FN\s+(.*)/i);
  const dobMatch = frontText.match(/DOB[:\s]*([0-9/]+)/i);
  const genderMatch = frontText.match(/(Male|Female)/i);
  const mobileMatch = frontText.match(/Mobile\s*No[:\s]*(\d{6,})/i);
const aadhaarNumber=extractAadhaarNumber(frontText)
  const addressLines = backText
    .split('\n')
    .filter(line => /C\/O|House|Valanchery|P O|Kerala|Malappuram/i.test(line))
    .join(', ');

  const pincodeMatch = backText.match(/Kerala\s*[-,]?\s*(\d{6})/i);

  return {
    fullName: nameMatch?.[1]?.trim() || null,
    aadhaarNumber:aadhaarNumber,
    dob: dobMatch?.[1]?.trim() || null,
    gender: genderMatch?.[1] || null,
    phoneNumber: mobileMatch?.[1] || null,
    address: addressLines || null,
    pinCode: pincodeMatch?.[1] || null
  };
}
