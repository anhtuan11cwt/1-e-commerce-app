import { stripe } from "../config/payment.js";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

const delivery_fee = 10;

export const placeOrder = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId = req.userId;

    const orderData = {
      address,
      amount,
      date: Date.now(),
      items,
      payment: false,
      paymentMethod: "COD",
      status: "Đơn hàng đã đặt",
      userId,
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ message: "Đặt hàng thành công", success: true });
  } catch (error) {
    console.log(error);
    res.json({ message: error.message, success: false });
  }
};

export const placeOrderStripe = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId = req.userId;

    const orderData = {
      address,
      amount,
      date: Date.now(),
      items,
      payment: false,
      paymentMethod: "Stripe",
      status: "Đang chờ",
      userId,
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: "vnd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "vnd",
        product_data: { name: "Phí vận chuyển" },
        unit_amount: delivery_fee,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      cancel_url: `${process.env.FRONTEND_URL}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/verify?success=true&orderId=${newOrder._id}`,
    });

    res.json({ session_url: session.url, success: true });
  } catch (error) {
    console.log(error);
    res.json({ message: error.message, success: false });
  }
};

export const verifyStripe = async (req, res) => {
  try {
    const { success, orderId } = req.body;
    const userId = req.userId;

    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });

      res.json({ message: "Thanh toán thành công", success: true });
    } else {
      await orderModel.findByIdAndDelete(orderId);

      res.json({ message: "Thanh toán thất bại", success: false });
    }
  } catch (error) {
    res.json({ message: error.message, success: false });
  }
};

export const allOrders = async (_req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ orders, success: true });
  } catch (error) {
    res.json({ message: error.message, success: false });
  }
};

export const userOrders = async (req, res) => {
  try {
    const userId = req.userId;

    const orders = await orderModel.find({ userId });

    res.json({ orders, success: true });
  } catch (error) {
    res.json({ message: error.message, success: false });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    await orderModel.findByIdAndUpdate(orderId, { status });

    res.json({ message: "Cập nhật trạng thái thành công", success: true });
  } catch (error) {
    res.json({ message: error.message, success: false });
  }
};
