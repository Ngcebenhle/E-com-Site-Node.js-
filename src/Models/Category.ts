import  * as mongoose from "mongoose";
import { model } from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, default: "" },
  status: { type: Boolean, required: true, default: true },
  photo: {type:String, required: false},
  created_at: { type: Date, required: true, default: new Date() },
  lastUpdated_at: { type: Date, required: true, default: new Date() },
});
export default model("categories", categorySchema);
