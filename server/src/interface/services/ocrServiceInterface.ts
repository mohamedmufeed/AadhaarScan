import { IOCRResult } from "../../types/ocr";

export interface IOCRService {
  processAadhaarOCR(frontPath: string, backPath: string): Promise<IOCRResult>;
}
