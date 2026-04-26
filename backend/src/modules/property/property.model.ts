// Property Model
import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      line1: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
    },

    type: {
      type: String,
      enum: ["APARTMENT", "HOUSE", "HOSTEL", "COMMERCIAL"],
      required: true,
    },

    // 🔥 Your flow: owned or leased
    acquisitionType: {
      type: String,
      enum: ["OWNED", "LEASED"],
      required: true,
    },

    // 🔥 For scoping (VERY IMPORTANT)
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
      index: true,
    },

    // Optional but useful
    description: {
      type: String,
      default: "",
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const PropertyModel = mongoose.model("Property", propertySchema);