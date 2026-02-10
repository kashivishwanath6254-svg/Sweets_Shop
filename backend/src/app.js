import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";
import productsRouter from "./routes/products.routes.js";
import adminProductsRouter from "./routes/admin.products.routes.js";
import registerRouter from "./routes/register.routes.js";

const app = express();

// Middleware
app.use(cors()); //Allowing backend to be accessed by frontend
app.use(express.json()); //Allowing backend to receive json

// Routes
app.use("/api/products", productsRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/users", registerRouter);

app.get("/", (req, res) => {
  res.send("Server working");
});

// Error handling middleware (must be last)
app.use(errorHandler);

export default app;
