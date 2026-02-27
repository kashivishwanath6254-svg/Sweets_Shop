import express, { urlencoded } from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";
import productsRouter from "./routes/products.routes.js";
import adminProductsRouter from "./routes/admin.products.routes.js";
import userRouter from "./routes/register.routes.js";

const app = express();

// Fix for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware

// app.use(
//   cors({
//     origin: true,
//     credentials: true,
//   })
// );

//test cors
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173", // your frontend URL
  })
);

app.use(express.json());
app.use(cookieParser());

// API Routes (must come BEFORE static serving)
app.use("/api/products", productsRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/users", userRouter);

//
// 👉 Serve React Build
//
app.use(express.static(path.join(__dirname, "public")));

//
// 👉 SPA Fallback (for /admin, /products, etc.)
// Must be AFTER everything else
//
app.use((req, res, next) => {
  if (req.path.startsWith("/api")) return next();
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Error handler LAST
app.use(errorHandler);

export default app;
