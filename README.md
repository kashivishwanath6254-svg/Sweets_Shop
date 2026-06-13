
# 🍬 Sweets Shop

A full-stack e-commerce web application built with the MERN stack (MongoDB, Express.js, React, Node.js).

The project was developed to explore real-world e-commerce architecture, including authentication, role-based authorization, inventory management, order processing, and admin workflow control.

---

## 🌐 Live Demo

**Application:** https://sweets-shop-backend.onrender.com

> The React frontend is served through the Express backend in production.

### Demo Credentials

```txt
Admin
Email: admin@sweets.com
Password: admin123

User
Email: test@gmail.com
Password: test123
```

---

## 🚀 Features

### Authentication & Authorization

* User registration and login
* JWT cookie-based authentication
* Protected routes
* Role-based access control (Admin/User)

### Product Management

* Product catalog browsing
* Product CRUD operations (Admin)
* Inventory management
* Stock tracking

### Shopping Experience

* Shopping cart
* Address management
* Checkout flow
* Order placement
* Order history
* Order cancellation
* Reorder functionality

### Admin Dashboard

* Product management
* Order monitoring dashboard
* Order status management
* Workflow enforcement

---

## 📦 Order Lifecycle

Orders follow a controlled workflow:

```txt
PLACED
  ↓
CONFIRMED
  ↓
PREPARING
  ↓
OUT_FOR_DELIVERY
  ↓
DELIVERED
```

The backend validates status transitions and prevents invalid workflow changes.

---

## 🛡 Inventory Management

The application includes inventory protection mechanisms:

* Atomic stock updates using MongoDB update operators and conditional queries
* Overselling prevention
* Automatic stock restoration when orders are cancelled
* Consistent inventory tracking throughout the order lifecycle

---

## 🛠 Tech Stack

### Frontend

* React
* React Router
* Tailwind CSS
* Vite

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* bcrypt

### Deployment

* Render
* MongoDB Atlas

---

## ⚙️ Installation & Setup

### Prerequisites

* Node.js
* MongoDB Atlas account (or local MongoDB)
* pnpm

### Clone Repository

```bash
git clone https://github.com/kashivishwanath6254-svg/Sweets_Shop.git
cd Sweets_Shop
```

### Backend Setup

```bash
cd backend
pnpm install
cp .env.example .env
```

Configure your `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=3000
NODE_ENV=development
```

Seed admin user:

```bash
pnpm run seed:admin
```

Start backend:

```bash
pnpm run dev
```

### Frontend Setup

```bash
cd frontend
pnpm install
pnpm run dev
```

---

## 🧑‍💻 Project Structure

```
Sweets_Shop/
├── backend/
│   ├── src/
│   │   ├── controllers/    # Handles request logic
│   │   ├── models/         # Mongoose schemas/models
│   │   ├── routes/         # API route definitions
│   │   ├── middlewares/    # Custom middleware functions (auth, admin, error handling)
│   │   ├── db/             # Database connection logic
│   │   ├── seed/           # Scripts for seeding database (e.g., admin user)
│   │   ├── public/         # Static assets served by Express
│   │   ├── app.js          # Express application setup
│   │   └── index.js        # Server entry point
│   ├── .env                # Environment variables (DO NOT COMMIT)
│   ├── .env.example        # Example environment variables
│   ├── package.json        # Backend dependencies and scripts
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── assets/         # Static assets like CSS, images
│   │   ├── components/     # Reusable UI components (Admin, Cart, UI elements, etc.)
│   │   ├── context/        # React Context API providers (Auth, Cart)
│   │   ├── hooks/          # Custom React hooks (e.g., useCart)
│   │   ├── pages/          # Top-level page components (Home, Products, Admin, etc.)
│   │   ├── services/       # API service functions (AuthApi, CartApi, ProductApi)
│   │   ├── config/         # Configuration files (e.g., API endpoints)
│   │   ├── data/           # App entry point and routing setup
│   │   └── index.css       # Main CSS file (imports Tailwind)
│   ├── public/             # Publicly accessible static assets (index.html)
│   ├── index.html          # Main HTML entry point
│   ├── package.json        # Frontend dependencies and scripts
│   └── vite.config.js      # Vite build configuration
└── README.md               # Project documentation
```

---

## 📚 API Reference (Backend Routes)

*   **Authentication (`/api/users`)**
    *   `POST /register`: Register a new user.
    *   `POST /login`: Log in an existing user.
    *   `POST /logout`: Log out the current user.
    *   `GET /me`: Get the currently logged-in user's information.
    *   `PATCH /updateProfile`: Update the current user's profile.
    *   `PATCH /changePassword`: Change the current user's password.

*   **Products (`/api/products` & `/api/admin/products`)**
    *   `GET /api/products`: Get all products, grouped by category.
    *   `GET /api/admin/products`: Get all products (Admin).
    *   `POST /api/admin/products`: Create a new product (Admin).
    *   `PUT /api/admin/products/:id`: Update a product by ID (Admin).
    *   `DELETE /api/admin/products/:id`: Delete a product by ID (Admin).

*   **Cart (`/api/cart`)**
    *   `POST /add`: Add a product to the cart.
    *   `GET /get`: Get the user's current cart.
    *   `PUT /update`: Update the quantity of a product in the cart.
    *   `DELETE /clear`: Clear all items from the cart.
    *   `DELETE /remove/:productId`: Remove a specific product from the cart.

*   **Orders (`/api/orders` & `/api/admin/orders`)**
    *   `POST /`: Create a new order.
    *   `GET /`: Get the current user's order history.
    *   `GET /:orderId`: Get details of a specific order by ID.
    *   `PATCH /cancel/:orderId`: Cancel an order by ID.
    *   `GET /api/admin/orders`: Get all orders (Admin).
    *   `PATCH /api/admin/orders/status/:orderId`: Update the status of an order (Admin).

*   **Addresses (`/api/address`)**
    *   `POST /add`: Add a new shipping address.
    *   `GET /get`: Get all saved addresses for the user.
    *   `PUT /update/:addressId`: Update an existing address.
    *   `DELETE /delete/:addressId`: Delete an address.
    *   `PATCH /default/:addressId`: Set an address as the default.


---

## 🚧 Future Improvements

* Payment gateway integration
* Email notifications
* Order status history
* Analytics dashboard
* Product image uploads
* Pagination and advanced filtering


