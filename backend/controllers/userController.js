import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import userModel from "../models/userModel.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ message: "Thiếu thông tin", success: false });
    }

    if (!validator.isEmail(email)) {
      return res.json({ message: "Email không hợp lệ", success: false });
    }

    if (password.length < 8) {
      return res.json({
        message: "Mật khẩu phải có ít nhất 8 ký tự",
        success: false,
      });
    }

    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ message: "Người dùng đã tồn tại", success: false });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      email,
      name,
      password: hashedPassword,
    });

    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ message: error.message, success: false });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ message: "Người dùng không tồn tại", success: false });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({
        message: "Thông tin đăng nhập không hợp lệ",
        success: false,
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ message: error.message, success: false });
  }
};

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      return res.json({ success: true, token });
    }

    return res.json({
      message: "Thông tin đăng nhập admin không hợp lệ",
      success: false,
    });
  } catch (error) {
    console.log(error);
    res.json({ message: error.message, success: false });
  }
};
