import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    cartData: {
      default: {},
      type: Object,
    },

    email: {
      lowercase: true,
      required: true,
      type: String,
      unique: true,
    },
    name: {
      required: true,
      type: String,
    },

    password: {
      required: true,
      type: String,
    },
  },
  { minimize: false, timestamps: true },
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
