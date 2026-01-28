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



This all about project works locally or in windows browser (localhost server) but you want to learn **DevOps**, willing to know how things works using **Linux**. Firstly we will see how local deployment using **WSL(UBUNTU)+Windows**.
-
🧠 Prerequisites :

✔️Windows 10/11
✔️WSL enabled

✔️Ubuntu 20.04+
✔️Node.js (v18+)

✔️npm
✔️MongoDB

---

### ⚙️ Step 1: Open Ubuntu (WSL)

Open Ubuntu from the Start Menu.
All commands below should be run inside the Ubuntu terminal.

---

### ⚙️ Step 2: Update System Packages
```bash
sudo apt update
sudo apt upgrade -y
```

---


### ⚙️ Step 3: Install Node.js & npm
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install nodejs -y
```
Verify installation:
```bash
node -v
npm -v
```

---

### ⚙️ Step 4: Install MongoDB
```bash
curl -fsSL https://pgp.mongodb.com/server-6.0.asc | sudo gpg --dearmor -o /usr/share/keyrings/mongodb.gpg

echo "deb [ signed-by=/usr/share/keyrings/mongodb.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb.list
```
```bash
sudo apt update
sudo apt install mongodb-org -y
```
Start MongoDB:
```bash
sudo service mongod start
```
Check MongoDB
```bash
mongosh
```
---

### ⚙️ Step 5: Move Project into Linux Home Directory

⚠️ Recommended: Do NOT run the project directly from /mnt/c

mkdir ~/projects
cp -r /mnt/c/Users/YourName/Desktop/mern-project ~/projects/
cd ~/projects/mern-project

⚙️ Step 6: Backend Setup
cd backend
npm install


Create .env file:

nano .env


Add:

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/mernapp


Start backend server:

node server.js


Backend runs at:

http://localhost:5000

⚙️ Step 7: Frontend Setup

Open a new terminal tab:

cd ~/projects/mern-project/frontend
npm install
npm start


Frontend runs at:

http://localhost:3000
