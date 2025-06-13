import { Router } from "express";
import upload from "../config/multer";
import { OcrService } from "../services/ocrService";
import { OcrController } from "../controllers/ocrController";

const ocrService= new OcrService()
const ocrController= new OcrController(ocrService)

const router=Router()
router.post("/process",upload.fields([{name:"front"},{name:"back"}]),ocrController.handleAadhaarOCR )
export default router