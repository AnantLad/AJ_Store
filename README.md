# 🛒 AJ_Store – E-Commerce Platform

🚀 **AJ_Store** is a **e-commerce web application** built using the **MERN Stack**.  
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
- ⚛️ React.js - It is Fast,Reliable and features like.. Reusable components,Virtual DOM,JSX format are makes it high 
- 🎨 Tailwind CSS - Responsive Design,Small size Bundles,No Naming 

### 🔙 Backend
- 🟢 Node.js - JS runtime envionment,Asynchronous & Non-Blocking I/O, Vast Ecosystem(NPM)
- 🚂 Express.js - JS Framework with RESTful APIs,Middleware and Routing
- 🔐 JWT Authentication - Stateless Security Mechanism 
  

### 🗄️ Database
- 🍃 MongoDB 

### 🚀 DevOps & Tools
- 🐳 Docker & Docker Compose
- 🌐 NGINX (Reverse Proxy)
- 🧪 Postman
- 🔧 [Git & GitHub](https://drive.google.com/file/d/1DLgdcDF28smmdWigEr1oorQDpmL6AdvZ/view?usp=sharing)

---

✔️ Microservice-like separation  
✔️ NGINX handles frontend & API routing  
✔️ Dockerized for consistent deployment  

---

##  Installation & Setup
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

### Deployment using WSL & Linux

This all about project works locally or in windows browser (localhost server) but you want to learn **DevOps**, willing to know how things works using **Linux**. Firstly we will see how local deployment using **WSL(UBUNTU)+Windows**.


### 🧠 Prerequisites :

✔️Windows 10/11

✔️WSL enabled

✔️Ubuntu 20.04+

✔️Node.js (v18+)

✔️npm

✔️MongoDB

---

###  Step 1: Open Ubuntu (WSL)

- Open Ubuntu from the Start Menu.
- All commands below should be run inside the Ubuntu terminal.

---
###  Step 2: Update System Packages
```bash
sudo apt update
sudo apt upgrade -y
```
---
###  Step 3: Install Node.js & npm
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install nodejs -y
```
- Verify installation:
```bash
node -v
npm -v
```
---
###  Step 4: Install MongoDB
```bash
curl -fsSL https://pgp.mongodb.com/server-6.0.asc | sudo gpg --dearmor -o /usr/share/keyrings/mongodb.gpg

echo "deb [ signed-by=/usr/share/keyrings/mongodb.gpg ] https://repo.mongodb.org/apt/ubuntu  jammy/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb.list
```
```bash
sudo apt update
sudo apt install mongodb-org -y
```
- Start MongoDB:
```bash
sudo service mongod start
```
- Check MongoDB
```bash
mongosh
```
---
###  Step 5: Move Project into Linux Home Directory

- Recommended: Do NOT run the project directly from /mnt/c
```bash
mkdir ~/projects
cp -r /mnt/c/Users/YourName/Desktop/AJ_Store ~/projects/
cd ~/projects/AJ_Store
```
---
###  Step 6: Backend Setup
```bash
cd backend
npm install
```
- Create .env file:
```
nano .env
```
- Add:
```
PORT=4000
MONGO_URI=mongodb://127.0.0.1:27017/db_name
```
- Start backend server:
```
node server.js or start
```
- Backend runs at:
```
http://localhost:4000
```
---
###  Step 7: Frontend Setup
- Open a new terminal tab:
```
cd ~/projects/AJ_Store/frontend
npm install
npm run dev
```
- Frontend runs at:
```
http://localhost:5173
```
---

## 🐳 Docker & Containerization

This project uses [**Docker**](https://drive.google.com/file/d/1wMz6ODdqe08i0vEsWeTR_AmKWisIS6DL/view?usp=sharing) to containerize all services, ensuring consistent behavior across development, testing, and production environments.

Docker eliminates “works on my machine” issues by packaging the application, runtime, dependencies, and configuration into isolated containers.

---


## Docker Usage in This Project

The application is split into multiple Docker containers:

- **NGINX Container**
  - Contains build file of frontend
  - Acts as a reverse proxy
  - Runs the React application
  - Routes API requests and serves frontend content
- **Backend Container**
  - Runs Node.js + Express REST APIs
  - Handles authentication, business logic, and database operations
- **Database Container**
  - MongoDB database
  - Data persisted using Docker volumes

Each container runs independently but communicates through a shared Docker network.

---

## Dockerfile

A **Dockerfile** defines the instructions to build a Docker image for a specific service.  
It ensures that the application runs consistently across all environments.

Each service (frontend, backend, nginx) has its own Dockerfile.

---

### Purpose of Dockerfile
- Define the base runtime environment
- Install dependencies
- Copy application source code
- Configure build and runtime commands
- Produce a reusable Docker image

---

## Docker Images & Containers

- **Docker Image**
  - A blueprint created using a `Dockerfile`
  - Contains application code and dependencies
- **Docker Container**
  - A running instance of a Docker image
  - Stateless by design (except volumes)

Images are built during deployment and containers are created from those images.

---

## Docker Compose

**Docker Compose** is used to orchestrate multiple containers using a single configuration file.

Key benefits:
- Single command to start all services
- Centralized configuration
- Simplified networking between services
- Environment-based setup (dev / prod)

```bash
docker compose up -d --build
```
---

## Push images on **Docker Hub**

### Step 1: Login to Docker Hub
```
docker login
```
---

### Step 2: Build Docker Image
```
docker build -t image-name .
```
---

### Step 3: Tag Image with Docker Hub Username
```
docker tag image-name dockerhub-username/image-name:tag
```
---

### Step 4: Push Image to Docker Hub
```
docker push dockerhub-username/image-name:tag
```
---

