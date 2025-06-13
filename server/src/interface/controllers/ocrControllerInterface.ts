import { Request, Response } from "express";

export default interface IOcrController{
    handleAadhaarOCR(req:Request,res:Response):Promise<void>
}