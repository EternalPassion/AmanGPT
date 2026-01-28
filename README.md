# AmanGPT 🚀

AmanGPT is a full-stack AI chatbot built with **React + Vite** on the frontend and **Node.js + Express + MongoDB** on the backend, powered by the **Gemini API**.  
It’s designed to deliver a personality-driven conversational experience with persistent chat history and a clean, responsive UI.

---
## 📸 Screenshots
<img width="100%" alt="upload 1" src="https://github.com/user-attachments/assets/25d0c271-6706-415d-bd0a-13e1461321e4" />
<img width="100%" alt="upload 2" src="https://github.com/user-attachments/assets/3a8ba1e1-987f-4f4b-bdf0-4e4b799258f3" />

## ✨ Features
- 🔹 Full-stack architecture (Frontend + Backend)
- 🔹 Responsive React + Vite UI
- 🔹 Persistent chat history stored in MongoDB
- 🔹 Personality-driven system prompt
- 🔹 Gemini API integration for intelligent responses
- 🔹 Secure setup with `.env` for API keys and secrets

---

## 🛠️ Tech Stack
**Frontend**
- React + Vite
- Context API for state management
- CSS modules for styling

**Backend**
- Node.js + Express
- MongoDB (Mongoose models)
- REST API routes

---

## ⚙️ Setup Instructions

### 1. Clone the repo
```bash
git clone https://github.com/EternalPassion/AmanGPT.git
cd AmanGPT
```
Create a .env file in Backend/ with:

```bash
MONGO_URI=your_mongodb_connection
GEMINI_API_KEY=your_api_key
```

📂 Project Structure

AmanGPT/
│── Backend/
│   ├── routes/
│   ├── models/
│   ├── utils/
│   └── server.js
│
│── Frontend/
│   ├── src/
│   ├── public/
│   └── vite.config.js
│
│── README.md   ← main project readme
│── TODO.md


