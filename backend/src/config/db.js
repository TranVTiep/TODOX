import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
    console.log("liên kết MongoDB thành công");
  } catch (error) {
    console.error("lỗi khi kết nối MongoDB:", error);
    process.exit(1); // thoát quá trình với mã lỗi
  }
};

export default connectDB;
