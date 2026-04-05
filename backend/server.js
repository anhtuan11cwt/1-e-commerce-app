import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectCloudinary from "./config/cloudinary.js";
import connectDB from "./config/mongodb.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import productRouter from "./routes/productRoute.js";
import userRouter from "./routes/userRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

connectDB();
connectCloudinary();

app.get("/", (_req, res) => {
  res.send("API Hoạt động");
});

app.get("/api/test", (_req, res) => {
  res.json({ message: "Backend Hoạt động tốt", success: true });
});

app.listen(port, () => {
  console.log(`Máy chủ chạy trên http://localhost:${port}`);
});
