import mongoose, * as mangoose from "mongoose";
import { model } from "mongoose";

const subCategorySchema = new mongoose.Schema({
  category_id: { type: mongoose.Types.ObjectId, ref:'categories', required: true},
  name: { type: String, required: true, default: "" },
  status: { type: Boolean, required: true, default: true },
  photo: {type:String, required: false},
  created_at: { type: Date, required: true, default: new Date() },
  lastUpdated_at: { type: Date, required: true, default: new Date() },
});

export default model("sub_categories", subCategorySchema);
