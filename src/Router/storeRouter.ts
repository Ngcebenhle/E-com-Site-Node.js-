import { Router } from "express";
import { body, validationResult } from "express-validator";
import { globalMiddleWare } from "../middleware/globalMiddleWare";
import { utils } from "../utils/utils";
import { storeController } from "../controller/storeController";
import { storeValidator } from "../validators/storeValidators";


class storeRouter {
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
  
    // this.router.get(
    //     "restaurant",
    //     globalMiddleWare.auth,
    //     restaurantController.getRestaurant
    //   );

      // this.router.get(
      //   "restaurant/nearby/banner",
      //   globalMiddleWare.auth,
      //   storeValidator.getNearByRestaurant(),
      //   globalMiddleWare.checkError,
      //   storeController.getNearByRestaurantAndBanner
      // );
     
      this.router.get(
        "/searchStore/:name",
        globalMiddleWare.auth,
        // globalMiddleWare.adminrole,
        globalMiddleWare.checkError,
        storeValidator.searchStore(),
        storeController.searchByIDStore
      );

      this.router.get(
        "/searchStore",
        globalMiddleWare.auth,
        // globalMiddleWare.adminrole,
        globalMiddleWare.checkError,
        storeValidator.searchStore(),
        storeController.searchStore
      );

      this.router.get(
        "/getStore",
        storeController.getstore
      );

  }

  postRoutes() { 

    this.router.post(
        "/create/store",
        globalMiddleWare.auth,
        // globalMiddleWare.adminrole,
        new utils().multer.single('storeImages'),
        storeValidator.addStore(),
       globalMiddleWare.checkError,
      storeController.addStore
       
      );
  }

  putRoutes() {}

  patchRoutes() {
    

  }

  deleteRoutes() {}
}

export default new storeRouter().router;
