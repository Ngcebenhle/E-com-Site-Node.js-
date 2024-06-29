import  * as mongoose from "mongoose";
import { model } from "mongoose";

const trackingSchema = new mongoose.Schema({
  company:{type:String},
  tracking_no: {type:String},
  status:{type: String},
  // price:{type: Number},
  estimated_time_of_delivery: {type:Number},
})

const orderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Types.ObjectId, ref:'users', required: true},  
  products: { type: Array, required: true, default: "" },
  address: { type: String, required: true },
  instruction: { type: String},
  status: { type: String, required: true },
  total: { type: Number, required: true },
  grand_Total: { type: Number, required: true },
  delivery_charge: {type: Number, required: true},
  payment_status: {type: Boolean, required: true},
  payment_mode: { type: String, required: true },
  // tracking: {trackingSchema},
  created_at: { type: Date, required: true, default: new Date() },
  lastUpdated_at: { type: Date, required: true, default: new Date() },
});


export default model("orders", orderSchema);
