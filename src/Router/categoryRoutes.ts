import { Router } from "express";
import { body, validationResult } from "express-validator";
import { globalMiddleWare } from "../middleware/globalMiddleWare";
import { utils } from "../utils/utils";
import { categoryController } from "../controller/categoryController";
import { categoryValidator } from "../validators/categoryValidators";

class categoryRouter {
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
      "/getCategories",
      globalMiddleWare.auth,
      categoryController.getCategory
     
    );

  }

  postRoutes() {
    
    this.router.post(
      "/add/banner",
     
      globalMiddleWare.auth, 
      globalMiddleWare.adminrole,
      new utils().multer.single('banner'),
    
      globalMiddleWare.checkError,
      // bannerController.addBanner
    );

    this.router.post(
      "/addcategory",
      globalMiddleWare.auth,
      globalMiddleWare.adminrole,
      categoryValidator.addcategory(), 
      new utils().multer.single('photo'),
      globalMiddleWare.checkError,
      categoryController.addCategory
    );
  }

  putRoutes() {}

  patchRoutes() {
    

  }

  deleteRoutes() {}
}

export default new categoryRouter().router;
