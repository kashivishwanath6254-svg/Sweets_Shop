import dotenv from "dotenv";
import connectDB from "./db/db.js";
import app from "./app.js";

// Loading the environment variables
dotenv.config();

// Connecting Database and starting server
connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running at Port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error Running the server:", err);
  });
