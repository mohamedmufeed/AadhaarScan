# Aadhaar OCR Web Application (MERN Stack)

This project is a simple MERN stack application that performs **OCR (Optical Character Recognition)** on Aadhaar card images. It allows users to upload front and back images of an Aadhaar card, process them using an OCR engine, and display the extracted text information on the frontend.

---

## 🔧 Tech Stack

- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **OCR Engine:** [tesseract.js](https://github.com/naptha/tesseract.js)
- **File Upload:** Multer (for handling image uploads)

---

## 📦 Project Structure

```
aadhaar-ocr/
├── client/        # React frontend (Vite)
├── server/        # Express backend with tesseract.js
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/mohamedmufeed/AadhaarScan.git
cd AadhaarScan
```

---

## 🖥️ Backend Setup (Node.js + Express)

### Step 1: Go to the backend folder

```bash
cd server
```

### Step 2: Install dependencies

```bash
npm install
```


### Step 3: Start the backend server

```bash
node run dev
```

> Server will run on `http://localhost:6001`

---

## 🌐 Frontend Setup (React + Vite)

### Step 1: Go to the frontend folder

```bash
cd ../client
```

### Step 2: Install dependencies

```bash
npm install
```

### Step 3: Start the frontend server

```bash
npm run dev
```

> Frontend will run on `http://localhost:5173`

---

## ✅ How to Use

1. Visit `http://localhost:5173`
2. Upload **front and back** images of the Aadhaar card.
3. Click the **"Extract Info"** button.
4. View the extracted text from both images on the screen.

---

## ⚠️ Notes

- Make sure both the frontend and backend servers are running.
- Ensure good image quality for better OCR accuracy.
- This project does not use a database; OCR results are processed and returned directly.
- All image files are removed from the server after processing.

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgements

- [Tesseract.js](https://github.com/naptha/tesseract.js)
- [React](https://reactjs.org/)
- [Express](https://expressjs.com/)
- [Vite](https://vitejs.dev/)
