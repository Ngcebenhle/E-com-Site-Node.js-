import mongoose, * as mangoose from "mongoose";
import { model } from "mongoose";

const StoreSchema = new mongoose.Schema({
  user_id: { type: mongoose.Types.ObjectId, ref: 'users', required: true },
  city_id: { type: mongoose.Types.ObjectId,ref: 'cities', required: true },
  name: { type: String, required: true },
  description: { type: String },
  storeImages: { type: String, require: false },
  open_time: { type: String, required: false },
  close_time: { type: String, required: false},
  address: { type: String, required: true },
  isClosed: { type: Boolean, required: true, default: false },
  location: { type: Object, required: true},
  status: { type: String, required: true, default: "active" },
  // rating: { type: Number, required: true, default: 0 },
  // total_rating: { type: Number, required: true, default: 0 },
  created_at: { type: Date, required: true, default: new Date() },
  lastUpdated_at: { type: Date, required: true, default: new Date() },
});

// StoreSchema.index({location:'2dsphere'}, {background: true});

export default model("stores", StoreSchema);
