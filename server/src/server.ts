import express from "express"
import cors from 'cors';
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import ocrRoutes from "./routes/ocrRoutes"
dotenv.config();
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
    cors({
        origin:"http://localhost:5173",
        credentials: true,
    })
);

app.use("/api/ocr", ocrRoutes);


const PORT= process.env.PORT||6001
app.listen(PORT,()=>{
    console.log("Server is Running" , PORT)
})