import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`MongoDB Đã kết nối: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Lỗi MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
