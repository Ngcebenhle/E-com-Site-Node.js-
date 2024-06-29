import mongoose, * as mangoose from "mongoose";
import { model } from "mongoose";

const cartSchema = new mongoose.Schema({
  products: {type:Array, required:true },
  user_id: { type: mongoose.Types.ObjectId, ref: "users", required: true },
  instruction: { type: String },
  status: { type: String, required: true },
  total: { type: Number, required: true },
//   grand_Total: { type: Number, required: true },
//   delivery_charge: { type: Number, required: true },
  //   payment_status: {type: Boolean, required: true},
  //   payment_mode: { type: String, required: true },
  created_at: { type: Date, required: true, default: new Date() },
  lastUpdated_at: { type: Date, required: true, default: new Date() },
});

export default model("cart", cartSchema);
