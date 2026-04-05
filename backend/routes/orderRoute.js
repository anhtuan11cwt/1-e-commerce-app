import express from "express";
import {
  allOrders,
  placeOrder,
  placeOrderStripe,
  updateStatus,
  userOrders,
  verifyStripe,
} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import auth from "../middleware/auth.js";

const orderRouter = express.Router();

orderRouter.post("/place", auth, placeOrder);
orderRouter.post("/stripe", auth, placeOrderStripe);
orderRouter.post("/userorders", auth, userOrders);
orderRouter.post("/verifyStripe", auth, verifyStripe);

orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

export default orderRouter;
