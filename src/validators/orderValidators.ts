import { body } from 'express-validator';
import Restaurant from '../Models/Restaurant';
import item from '../Models/item';

export class orderValidator {

  // static addOrder() {
  //   return [
  //     body('restaurant_id', 'restaurant ID name is required')
  //       .isString()
  //       .custom((restaurant_id, { req }) => {
  //         return Restaurant.findById({
  //           __id: restaurant_id,
  //         })
  //           .then((restaurant) => {
  //             if (!restaurant) {
  //               throw 'Restaurant does not exist';
  //             } else {
  //               req.restaurant = restaurant;
  //               return true;
  //             }
  //           })
  //           .catch((e) => {
  //             throw new Error(e);
  //           });
  //       }),
  //     body('order', 'Order items is required').isString(),
  //     body('address', 'Address is required').isString(),
  //     body('status', 'Status is required').isString(),
  //     body('payment_status', 'Payment_Status name is required').isBoolean(),
  //     body('payment_mode', 'Payment Mode is required').isString(),
  //     body('total', 'total is required').isNumeric(),
  //     body('grand_Total', 'Order total is required').isNumeric(),
  //     body('delivery_charge', 'Delivery Charge is required').isNumeric(),
  //   ];
  // }
  static addOrder() {
    return [
      // body("store_id", "store ID name is required")
      //   .isString()
      //   .custom((store_id, { req }) => {
      //     return Store.findById({
      //       store_id,
      //     })
      //       .then((store) => {
      //         if (!store) {
      //           throw "store does not exist";
      //         } else {
      //           req.store = store;
      //           return true;
      //         }
      //       })
      //       .catch((e) => {
      //         throw new Error(e);
      //       });
      //   }),

      body("products", "Products are required").isString()
      .custom((products, { req }) => {
           if (req.user.type != 'user'){
             throw('You are not authorised to place an order')
           }
           products = JSON.parse(products)
           const product_ids = products.map(x => x._id);
           req.product_ids = product_ids
          let list = {$in: [...product_ids]}  
           return item.findById({
              _id:product_ids
            // _id:$in: [...products_ids]
            // _id:{$all: [...product_ids]}    
           })
            .then((server_products:any) => {
              // console.log(server_products)
              // if (!server_products || server_products.length != products.length)
              if (!server_products ) {
                throw "Products mismatched!";
              } else {
                req.server_products = server_products;
                return true;
              }
            })
            .catch((e) => {
              throw new Error(e);
            });
          }),
      body("address", "Address is required").isString(),
      body("status", "Status is required").isString(),
      body("payment_status", "Payment_Status name is required").isBoolean(),
      body("payment_mode", "Payment Mode is required").isString(),
      body("grand_Total", "Order total is required").isNumeric(),
      body("delivery_charge", "Delivery Charge is required").isNumeric(),
      body("total", "total is required").isNumeric()
      // .custom((total, { req }) => {
      //    let tot = 0;
      //    const server_products = req.server_products.map(server_product =>{
      //     let products = JSON.parse(req.body.products)
      //     let product = products.find(x => x._id == server_product._id)
      //     if(!product.quantity || product.quantity == 0){
      //       throw('Please provide a proper quantity for ' + product.name)
      //     }
      //     console.log(product)
      //     if(server_product.variations?.length ==0){
      //       if(server_product.price != product.price){
      //           console.log('Price mismatch')
      //           throw('Price Mismatch! Check the latest price of' + product.name)
      //       }
      //       else if (product.quantity > server_product.stock_unit){
      //         throw('Out of Stock!'+product.name + 'Just went out of stack')
      //       }
      //      tot += server_product.price * parseFloat(product.quantity)
      //      return server_product
      //     }
      //     else{
      //       let variation = server_product.variations.find(variation => variation.sku && variation.sku == product.sku)
      //       if(variation){
      //         if(variation.price != product.price){
      //            throw('Price Mismatch! Check the latest price of' + product.name)
      //         }
      //         else if (product.quantity > variation.stock_unit){
      //             throw('Out of Stock '+ product.name + 'Just went out of stock')
      //         }
      //         tot += variation.price * parseFloat(product.quantity)
      //         return server_product
      //       }
      //       else{
      //         // let size = server_product.variations.map(x => x.size)

      //         if(variation?.size?.length > 0){
      //           let data = variation.size.find(x => x.sku && x.sku == product.sku)
      //           if(data){
      //             if(data.price != product.price){
      //               throw('Prise Mismatch! Check the latest price of' + product.name);
   
      //              }else if(product.quantity > data.stock_unit){
      //                throw('Out of Stock '+ product.name + 'Just went out of stock')
      //              }
      //              tot += data.price * parseFloat(product.quantity);
      //              return server_product
      //           }
      //         }else{
      //           throw('Products mismatched!')  //// here !!!!!!
      //         }
      //       }
           
      //     }

      //    });
      //    console.log('total: ' + tot);
      //    const grandTotal = tot + parseFloat(req.body.delivery_charge);
      //    console.log('grand total: ', grandTotal);
      //    if(total != tot || req.body.grandTotal != grandTotal){
      //     console.log("Throw Error");
      //     throw('Amount to pay Mismatch Total Amount should be' + grandTotal)
      //    }
      //    else{
      //     return true
      //    }
      // }),

    ];
  }
}
