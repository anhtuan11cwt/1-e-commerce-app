import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.json({
        message: "Không được phép, hãy đăng nhập lại",
        success: false,
      });
    }
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    if (tokenDecode.role !== "admin") {
      return res.json({
        message: "Không được phép, hãy đăng nhập lại",
        success: false,
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.json({ message: error.message, success: false });
  }
};

export default adminAuth;
