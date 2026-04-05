import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
  try {
    const { itemId, size } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.json({
        message: "Không xác định được người dùng",
        success: false,
      });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ message: "Người dùng không tồn tại", success: false });
    }

    const cartData = userData.cartData || {};

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ message: "Đã thêm vào giỏ hàng", success: true });
  } catch (error) {
    console.log(error);
    res.json({ message: error.message, success: false });
  }
};

const updateCart = async (req, res) => {
  try {
    const { itemId, size, quantity } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.json({
        message: "Không xác định được người dùng",
        success: false,
      });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ message: "Người dùng không tồn tại", success: false });
    }

    const cartData = userData.cartData || {};

    if (cartData[itemId] && cartData[itemId][size] !== undefined) {
      cartData[itemId][size] = quantity;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ message: "Đã cập nhật giỏ hàng", success: true });
  } catch (error) {
    console.log(error);
    res.json({ message: error.message, success: false });
  }
};

const getUserCart = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.json({
        message: "Không xác định được người dùng",
        success: false,
      });
    }

    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.json({ cartData: {}, success: true });
    }

    res.json({ cartData: userData.cartData || {}, success: true });
  } catch (error) {
    console.log(error);
    res.json({ message: error.message, success: false });
  }
};

export { addToCart, getUserCart, updateCart };
