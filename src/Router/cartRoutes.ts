import { Router } from "express";
import { globalMiddleWare } from "../middleware/globalMiddleWare";
import { utils } from "../utils/utils";
import { cartValidator } from "../validators/cartValidators";
import { cartController } from "../controller/cartContraller";

class cartRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.getRoutes();
    this.postRoutes();
    this.putRoutes();
    this.patchRoutes();
    this.deleteRoutes();
  }

  getRoutes() {
  
     
    this.router.get(
        "/user/cart",
       
        globalMiddleWare.auth,
        cartController.getUserCart
      );

  }

  postRoutes() {
    
    this.router.post(
        "/add/order",
        globalMiddleWare.auth,
        globalMiddleWare.adminrole,
        new utils().multer.single('banner'),
        cartValidator.addToCart(),
        globalMiddleWare.checkError,
        cartController.addToCart
      );
  }

  putRoutes() {}

  patchRoutes() {
    

  }

  deleteRoutes() {}
}

export default new cartRouter().router;
