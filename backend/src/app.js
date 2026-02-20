import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import { errorHandler } from "./middlewares/errorHandler.middleware.js";
import productsRouter from "./routes/products.routes.js";
import adminProductsRouter from "./routes/admin.products.routes.js";
import registerRouter from "./routes/register.routes.js";

const app = express();

// Fix for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// API Routes (must come BEFORE static serving)
app.use("/api/products", productsRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/users", registerRouter);

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
