# 🛒 AJ_Store – Quick Commerce E-Commerce Platform

🚀 **AJ_Store** is a quick commerce e-commerce web application** built using the **MERN Stack**.  
The platform focuses on **fast product delivery experience**, **smooth cart & checkout flow**, and **scalable backend architecture** using **Docker and NGINX**.

This project is designed with **real-world production practices** and is suitable for **placements, internships, and full-stack/DevOps roles**.

---

## ✨ Features

### 👤 User Features
- 🔐 Secure Authentication (JWT based Login / Register)
- 🛍️ Browse Products by Category
- 🔎 Search & Filter Products
- 🛒 Add to Cart & Manage Quantity
- 📦 Place Orders & View Order History
- 💳 Checkout Flow (COD / Online – if integrated)

---

### 🛠️ Admin / Seller Features
- ➕ Add / Update / Delete Products
- 🗂️ Category Management
- 📊 Manage Orders
- 👥 Manage Users

---

## 🧰 Tech Stack

### 🌐 Frontend
- ⚛️ React.js
- 🎨 Tailwind CSS
- 🔄 Axios
- 🧠 Context API

### 🔙 Backend
- 🟢 Node.js
- 🚂 Express.js
- 🔐 JWT Authentication
- 🧩 RESTful APIs

### 🗄️ Database
- 🍃 MongoDB
- 📦 Mongoose ODM

### 🚀 DevOps & Tools
- 🐳 Docker & Docker Compose
- 🌐 NGINX (Reverse Proxy)
- 🧪 Postman
- 🔧 Git & GitHub

---

## 🏗️ Project Architecture
```bash
AJ_Store/
│
├── frontend/ # React Frontend
├── backend/ # Node.js + Express APIs
├── nginx/ # NGINX Configuration
├── docker-compose.yml # Multi-container setup
└── README.md
```

✔️ Microservice-like separation  
✔️ NGINX handles frontend & API routing  
✔️ Dockerized for consistent deployment  

---

## ⚙️ Installation & Setup
### 1️⃣ Clone Repository
```bash
git clone https://github.com/anantlad/AJ_Store.git

```

---

### 2️⃣ Configure Environment Variables

Create .env inside backend/
```bash
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```
---

### 3️⃣ Manual Setup
backend
```bash
cd backend
npm install
npm start
```
frontend 
```bash
cd frontend
npm install
npm run dev
```
---
