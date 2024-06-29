import { Router } from "express";
import { body, validationResult } from "express-validator";
import { globalMiddleWare } from "../middleware/globalMiddleWare";
import { utils } from "../utils/utils";
import { categoryController } from "../controller/categoryController";

import { subCategoryController } from "../controller/subCategoryController";
import { subCategoryValidator } from "../validators/subCategoryValidators";
class subCategoryRouter {
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
        "/getSubCategories",
        globalMiddleWare.auth,
        subCategoryController.getSubCategory
       
      );

      this.router.get(
        "/getSubCategories",
        // globalMiddleWare.auth,
        // subCategoryValidator.getSub_Cat(),
        // globalMiddleWare.checkError,
        subCategoryController.getSubCategory
       
      );

  }

  postRoutes() {
    
    this.router.post(
        "/add/subCategory",
        globalMiddleWare.auth, 
        globalMiddleWare.adminrole,
        subCategoryValidator.addSubCategory(),
        // new utils().multer.single('subCategories'),
        globalMiddleWare.checkError,
       subCategoryController.addSubCategory
      );

    //   this.router.post(
    //     "add/category",
    //     categoryValidator.addcategory(),
    //     globalMiddleWare.auth,
    //     globalMiddleWare.adminrole,
    //     new utils().multer.single('categoryImage'),
      
    //     globalMiddleWare.checkError,
    //     // bannerController.addBanner
    //   );
  }

  putRoutes() {}

  patchRoutes() {}

  deleteRoutes() {}
}

export default new subCategoryRouter().router;
