import * as mongoose from "mongoose";
import { model } from "mongoose";

const sizeSchema = new mongoose.Schema({
  size: { type: String },
  sku: { type: String },
  price: { type: Number },
  stock_unit: { type: Number },
});

const metricsSchema = new mongoose.Schema({
  orders: { type: Number },
  ratings: { type: Number },
});

const variationsSchema = new mongoose.Schema({
  type: { type: String },
  images: [{ type: String }],
  sku: { type: String },
  price: { type: Number },
  stock_unit: { type: Number },
  size: [sizeSchema],
});

const itemSchema = new mongoose.Schema({
  store_id: { type: mongoose.Types.ObjectId, ref: "stores", required: true },
  category_id: {
    type: mongoose.Types.ObjectId,
    ref: "categories",
    required: true,
  },
  sub_category_id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  specification: { type: Object },
  images: [{ type: String }],
  sku: { type: String },
  price: { type: Number },
  stock_unit: { type: Number },
  metrics: metricsSchema,
  variations: [variationsSchema],
  status: { type: Boolean, required: true },
  date_created: { type: Date, required: true, default: new Date() },
  date_updated: { type: Date, required: true, default: new Date() },
});

export default model("item", itemSchema);
