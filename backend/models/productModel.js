import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    bestseller: {
      default: false,
      type: Boolean,
    },

    category: {
      required: true,
      type: String,
    },

    date: {
      required: true,
      type: Number,
    },

    description: {
      required: true,
      type: String,
    },

    image: {
      required: true,
      type: [String],
    },
    name: {
      required: true,
      trim: true,
      type: String,
    },

    price: {
      min: 0,
      required: true,
      type: Number,
    },

    sizes: {
      required: true,
      type: [String],
    },

    subCategory: {
      required: true,
      type: String,
    },
  },
  { timestamps: true },
);

const productModel =
  mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
