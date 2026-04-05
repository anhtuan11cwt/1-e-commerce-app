import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.json({
        message: "Không được phép, hãy đăng nhập lại",
        success: false,
      });
    }
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = tokenDecode.id;
    next();
  } catch (error) {
    console.log(error);
    res.json({ message: error.message, success: false });
  }
};

export default authUser;
