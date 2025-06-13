import { IOCRResult } from "../../types/ocr";

export interface IOCRService {
  processAadhaarOCR(frontBuffer: Buffer, backBuffer: Buffer): Promise<IOCRResult>;
}
