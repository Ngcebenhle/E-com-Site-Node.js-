import { body } from "express-validator";
import cart from "../Models/cart";

export class cartValidator {
  static addToCart() {
    return [
      body("products", "Products are required").isString(),
      body("status", "Status is required").isString(),
      body("total", "total is required").isNumeric(),
    //   body("grand_Total", "Order total is required").isNumeric(),
    //   body("delivery_charge", "Delivery Charge is required").isNumeric(),
    ];
  }
}
