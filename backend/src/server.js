import express from "express";
import tasksRoutes from "./routes/tasksRoutes.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
const PORT = process.env.PORT || 5001;
const app = express(); // ✅ tạo app trước
app.use(express.json()); // ✅ middleware parse JSON
app.use(cors({ origin: "http://localhost:5173" })); // cho phép CORS

app.use("/api/tasks", tasksRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
