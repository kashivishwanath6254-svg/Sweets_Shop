# 🍬 Sweets Shop – Full Stack Web Application

A full-stack sweets shop web application built using the **MERN stack**.  
This project was built as a full-stack MERN learning project focused on real-world ecommerce functionality and backend architecture.

---
## 🌐 Deployed Application

- App URL: https://sweets-shop-backend.onrender.com

> The frontend production build is served through the Express backend.

### Demo Credentials

```txt
Admin:
Email: admin@sweets.com
Password: admin123

User:
Email: test@gmail.com
Password: test123
```

## 🛠 Tech Stack

### Frontend

- React (Vite)
- React Router
- TailwindCSS
- JavaScript (ES6+)

### Backend

- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- JWT Authentication
- bcrypt for password hashing

---

## 🚀 Features

### Implemented

- **Authentication System**: User registration, login, logout, and JWT cookie-based authentication
- **Role-Based Authorization**: Separate admin and user access control
- **Product Management**: Admin product creation, editing, deletion, and stock management
- **Shopping Cart**: Add to cart, update quantities, and remove items
- **Address Management**: Multiple saved addresses with default address support
- **Checkout & Orders**: Address selection, order placement, stock validation, and order history
- **User Profile**: Profile management and personal order viewing
- **Responsive Frontend**: Fully responsive UI built with TailwindCSS
- **Frontend Routing**: SPA routing using React Router
- **REST API**: Structured RESTful backend with centralized error handling
- **Database Integration**: MongoDB Atlas with Mongoose schemas and relationships

### Pages

- Home
- Products
- About
- Contact
- Cart
- Checkout
- Profile
- Admin Panel

### Planned

- Payment integration
- Order tracking
- Email notifications
- Advanced admin analytics

---

## 🧑‍💻 Running the Project Locally

### Prerequisites

- Node.js installed
- MongoDB Atlas account (or local MongoDB)
- pnpm (preferred) or npm

### Backend Setup

```bash
cd backend
pnpm install
cp .env.example .env  # Configure your environment variables
pnpm run dev
```

Backend runs on the port defined in the `.env` file or on 3000 as default.

### Frontend Setup

```bash
cd frontend
pnpm install
pnpm run dev
```

Frontend runs on Vite's default development port.

### Seeding Admin User

```bash
cd backend
pnpm run seed:admin
```

---

## 📁 Project Structure

```
Sweets_Shop/
├── backend/
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   ├── middlewares/    # Custom middleware
│   │   ├── db/             # Database connection
│   │   ├── seed/           # Database seeding scripts
│   │   ├── app.js          # Express app configuration
│   │   └── index.js        # Server entry point
│   ├── .env                # Environment variables
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context
│   │   ├── services/       # API services
│   │   ├── hooks/          # Custom hooks
│   │   ├── config/         # Configuration files
│   │   └── constants/      # Constants
│   └── package.json
└── README.md
```

---

## 🔑 Environment Variables

Backend requires the following environment variables in `.env`:

```
MONGODB_URI=your_mongodb_connection_string
PORT=3000
JWT_SECRET=your_jwt_secret_key
```

---

## 📄 License

ISC