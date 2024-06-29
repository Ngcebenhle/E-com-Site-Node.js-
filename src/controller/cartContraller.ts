import cart from "../Models/cart";
export class cartController {
  static async addToCart(req, res, next) {

    const data = req.body;
    const user_id = req.user.userId;
   
    try {
      let cartInfo: any = {
         user_id,
        products: JSON.parse(data.products),
        status: data.status,
        total: data.total,
        //  grand_Total: data.grand_Total,
        //  delivery_charge: data.delivery_charge,
      };

      if (data.instruction)cartInfo = { ...cartInfo, instruction: data.instruction };

      const UserCart = await new cart(cartInfo).save()
      // const update_cart = await cart.findOneAndUpdate(
      //   {
      //     _id:user_id,
      //   },
      //   {
      //     ...cartInfo
      //   },
      //   {
      //     new: true,
      //     projection: {
      //       __v: 0,
      //       user_id: 0,
      //       _id: 0,
      //     },
      //   }
      // );
      // if (update_cart) {
      //   cartInfo = { ...cartInfo, user_id };
      //   let cartData = await new cart(cartInfo).save();

      //   const update_cart: any = {
      //     products: cartData.products,
      //     instruction: cartData.instruction || null,
      //     total: cartData.total,
      //     created_at: cartData.created_at,
      //     lastUpdated_at: cartData.lastUpdated_at,
      //   };
      // }

      res.send(UserCart);
    } catch (e) {
      next(e);
    }

    // res.send('it works')
  }

  static async getUserCart(req, res, next) {
    const user_id = req.user.aud;

    try {
      const cart_data = await cart.find(
        { user_id },
        { user_id: 0, __v: 0, _id: 0 }
      );

      // res.send(carts);
      res.json({
        cart_data,
      });
    } catch (e) {
      next(e);
    }
  }

  static async deleteFromCart(req, res, next) {
    const user_id = req.user._id;
    const perPage = 5;
    const currentPage = parseInt(req.query.page) || 1;
    const prevpage = currentPage == 1 ? null : currentPage - 1;
    let nextPage = currentPage + 1;

    try {
      const cart_doc_count = await cart.countDocuments({
        user_id: user_id,
      });
      if (!cart_doc_count) {
        res.json({
          carts: [],
          perPage,
          currentPage,
          prevpage,
          nextPage: null,
          totalPages: 0,
        });
      }
      const totalPages = Math.ceil(cart_doc_count / perPage);
      if (totalPages == 0 || totalPages == currentPage) {
        nextPage = 0;
      }
      if (totalPages < currentPage) {
        throw "No more Addresses carts available";
      }
      const carts = await cart
        .find(
          {
            user_id,
          },
          {
            user_id: 0,
            __v: 0,
          }
        )
        .skip(perPage * currentPage - perPage)
        .limit(perPage)
        .sort({ created_at: -1 })
        .populate("restaurant_id")
        .exec();
      // res.send(carts);
      res.json({
        carts,
        perPage,
        currentPage,
        prevpage,
        nextPage,
        totalPages,
      });
    } catch (e) {
      next(e);
    }
  }

  static async payment(req, res, next) {
    const user_id = req.user._id;
    const perPage = 5;
    const currentPage = parseInt(req.query.page) || 1;
    const prevpage = currentPage == 1 ? null : currentPage - 1;
    let nextPage = currentPage + 1;

    try {
      const cart_doc_count = await cart.countDocuments({
        user_id: user_id,
      });
      if (!cart_doc_count) {
        res.json({
          carts: [],
          perPage,
          currentPage,
          prevpage,
          nextPage: null,
          totalPages: 0,
        });
      }
      const totalPages = Math.ceil(cart_doc_count / perPage);
      if (totalPages == 0 || totalPages == currentPage) {
        nextPage = 0;
      }
      if (totalPages < currentPage) {
        throw "No more Addresses carts available";
      }
      const carts = await cart
        .find(
          {
            user_id,
          },
          {
            user_id: 0,
            __v: 0,
          }
        )
        .skip(perPage * currentPage - perPage)
        .limit(perPage)
        .sort({ created_at: -1 })
        .populate("restaurant_id")
        .exec();
      // res.send(carts);
      res.json({
        carts,
        perPage,
        currentPage,
        prevpage,
        nextPage,
        totalPages,
      });
    } catch (e) {
      next(e);
    }
  }
}
