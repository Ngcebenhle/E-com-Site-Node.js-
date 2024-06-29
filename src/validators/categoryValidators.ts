import { body, query } from "express-validator";
import userModel from "../Models/userModel";

export class categoryValidator {
  static addcategory() {
    return [
      body("name", "Name is required").isString(),
      body("status", "Status is required").isString(),
      // body("photo", "photo is required").isString()
      // .custom((photo, { req }) => {
      //   if (req.file) {
      //     return true;
      //   } else {
      //     throw ("File not uploaded");
      //   }
      // }),
    ];
  }
}
