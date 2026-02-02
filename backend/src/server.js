import express from "express";
import tasksRoutes from "./routes/tasksRoutes.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
dotenv.config();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve(); // để lấy đường dẫn tuyệt đối
const app = express(); // ✅ tạo app trước
app.use(express.json()); // ✅ middleware parse JSON
if (process.env.NODE_ENV !== "development") {
  app.use(cors({ origin: "http://localhost:5173" })); // cho phép CORS
}

app.use("/api/tasks", tasksRoutes);

// Phục vụ tệp tĩnh từ thư mục frontend/build
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
