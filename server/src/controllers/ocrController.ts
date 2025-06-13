import { Request, Response } from "express";
import IOcrController from "../interface/controllers/ocrControllerInterface";
import { IOCRService } from "../interface/services/ocrServiceInterface";

export class OcrController implements IOcrController {
    constructor(private _ocrService: IOCRService) { }

    handleAadhaarOCR = async (req: Request, res: Response) => {
        try {
            const files = req.files as { [fieldname: string]: Express.Multer.File[] };
            const front = files["front"]?.[0];
            const back = files["back"]?.[0];
            if (!front || !back){
                res.status(400).json({ message: "Both front and back images are required." });
                return
            }

      const result = await this._ocrService.processAadhaarOCR(front.buffer, back.buffer);

            res.status(200).json(result);
        } catch (error) {
            console.error("OCR Processing Error:", error);
            res.status(500).json({ message: "Internal Server Error during OCR." });
        }
    };
}
