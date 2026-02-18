import dotenv from "dotenv";
import connectDB from "./db/db.js";
import app from "./app.js";

const PORT = process.env.PORT||3000;

// Loading the environment variables
dotenv.config();

// Connecting Database and starting server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running at Port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error Running the server:", err);
  });
