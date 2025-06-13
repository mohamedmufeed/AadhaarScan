import axios, { AxiosError } from "axios"

const BASE_URL = "http://localhost:6001/api/ocr"

export const processAadhaarOCR = async (formData: any) => {
    try {
        const response = await axios.post(`${BASE_URL}/process`, formData, {
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Error on Process ocr :", error.response?.data);
            return {
                success: false,
                message: error.response?.data?.message || "Something went wrong",
            };
        }
    }
}
