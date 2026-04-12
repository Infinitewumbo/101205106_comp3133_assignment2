# Employee Management System (Full-Stack GraphQL)

This project is a comprehensive Employee Management System built for **COMP3133: Full Stack Development II**. It features a modern Angular frontend and a robust Node.js/Express backend powered by Apollo Server and MongoDB.

## Live Deployment
The application is live and hosted on Vercel:
* **Frontend (Angular):** [https://101205106-comp3133-assignment2-fron.vercel.app/login](https://101205106-comp3133-assignment2-fron.vercel.app/login)
* **Backend (GraphQL API):** [https://101205106-comp3133-assignment2-backend-alumz0qkd.vercel.app/graphql](https://101205106-comp3133-assignment2-backend-alumz0qkd.vercel.app/graphql)

---

## Tech Stack

### **Frontend**
* **Framework:** Angular 17+
* **Client:** Apollo Client 
* **Styling:** CSS
* **Hosting:** Vercel 

### **Backend**
* **Runtime:** Node.js / Express.js
* **API:** GraphQL (Apollo Server 4)
* **Database:** MongoDB Atlas 
* **Hosting:** Vercel 

### **Containerization**
* **Tool:** Docker & Docker Compose 

---

## Features
* **Real-time Search:** Instantly filter the employee list by name or department.
* **AuthGuard Security:** Protected routes to prevent unauthorized access to employee data.
* **Persistent Session:** JWT-based authentication that survives page refreshes.
* **Custom UI Components:** Illustrated empty states and custom-themed data tables.

## Project Architecture
* `/frontend`: Angular source code, environment configurations, and deployment scripts.
* `/backend`: GraphQL schemas (TypeDefs), Resolvers, Mongoose models, and Server logic.
* `docker-compose.yml`: Orchestration for running both services locally.

---

## Local Setup & Installation

### **1. Standard Manual Setup**
**Backend:**
1. Navigate to folder: `cd backend`
2. Install dependencies: `npm install`
3. Configure `.env`: Add `MONGODB_URI=your_mongodb_connection_string`
4. Run: `npm start` (Runs on `http://localhost:4000/graphql`)

**Frontend:**
1. Navigate to folder: `cd frontend`
2. Install dependencies: `npm install`
3. Run: `ng serve` (Runs on `http://localhost:4200`)

### **2. Docker Setup**
```bash
# From the root directory
docker-compose up --build