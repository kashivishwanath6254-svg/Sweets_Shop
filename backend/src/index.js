import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
import productsRouter from "./routes/products.routes.js";
import adminProductsRouter from "./routes/admin.products.routes.js";

//Loading the environment variables
dotenv.config();

const app = express(); //creating server
app.use(cors()); //Allowing backend to be accessed by frontend
app.use(express.json()); //Allowing backend to receive json

//Defining Routes
app.use("/api/products", productsRouter);
app.use("/api/admin/products", adminProductsRouter);

app.get("/", (req, res) => {
  res.send("Server working");
});

//Connecting Database and starting server
connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running at Port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error Running the server:", err);
  });
