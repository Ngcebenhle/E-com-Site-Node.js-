import { body, param, query } from 'express-validator';
import Restaurant from '../Models/Restaurant';
import Category from '../Models/Category';
import Store from "../Models/Store";

export class itemValidator {
  // static addItem() {
  //   return [
      
  //     body('name','Item name is required').isString(),
  //     body('restaurant_id', 'Restaurant ID is required')
  //       .isString()
  //       .custom((restaurant_id, { req }) => {
  //         return Restaurant.findById({
  //           _id: restaurant_id,
  //         })
  //           .then((restaurant) => {
  //             if (!restaurant) {
  //               throw 'Resturant does not exist';
  //             } else {
  //               return true;
  //             }
  //           })
  //           .catch((e) => {
  //             throw new Error(e);
  //           });
  //       }),

  //     body('category_id', 'Category ID is required')
  //       .isString()
  //       .custom((category_id, { req }) => {
  //         return Category.findById({
  //           _id: category_id,
  //           restaurant_id: req.body.restaurant_id,
  //         })
  //           .then((categories) => {
  //             if (!categories) {
  //               throw 'Category does not exist';
  //             } else {
  //               return true;
  //             }
  //           })
  //           .catch((e) => {
  //             throw new Error(e);
  //           });
  //       }),
  //     body('veg', 'Item is Veg is required').isBoolean(),
  //     body('status', 'Status is required').isBoolean(),
  //     body('price', 'Price is required').isNumeric(),
  //     body('itemImage', 'Cover Image is required')
  //     .custom((cover, {req}) =>{
  //         if(req.file){
  //             return true;
  //         }
  //         else{
  //             throw('File not uploaded')
  //         }
  //     } ),
  //   ];
  // }
  // static getItemMenu() {
  //   return [
  //     param('restaurantID', 'Restaurant ID is required')
  //       .isString()
  //       .custom((restaurant_id, { req }) => {
  //         return Restaurant.findById({
  //           _id:restaurant_id,
  //         })
  //           .then((restaurant) => {
  //             if (!restaurant) {
  //               throw 'Resturant does not exist';
  //             } else {
  //               req.restaurant = restaurant;
  //               return true;
  //             }
  //           })
  //           .catch((e) => {
  //             throw new Error(e);
  //           });
  //       }),

  //     // body('category_id', 'Category ID is required')
  //     // .custom((category_id, {req})=>{
  //     //     return Category.findById({
  //     //         // _id: category_id,
  //     //         restaurant_id:req.body.restaurant_id
  //     //     })
  //     //     .then(categories => {
  //     //        if(categories){
  //     //         throw('Category does not exist')
  //     //        }else{
  //     //         return true
  //     //        }
  //     //     })
  //     //     .catch(e =>{
  //     //         throw new Error(e)

  //     //     })
  //     // }),
  //   ];
  // }

  static addItem(){
    return [
        // body('itemImage', 'Cover Image is required')
        // .custom((cover, {req}) =>{
        //     if(req.files){
        //         return true;   
        //     } 
        //     else{
        //         throw('File not uploaded')
        //     }
        // } ),
        body('name', 'Item name is required').isString(),
        body('store_id', 'Store ID is required').isString()
        .custom((store_id, {req})=>{
            return Store.findById({
              _id:store_id
            })
            .then(store => {
               if(!store){
                throw('Store does not exist')
               }else{
                return true
               }
            })
            .catch(e =>{
                throw new Error(e)

            })
        }),
        
        body('category_id', 'Category ID is required').isString()
        .custom((category_id, {req})=>{
            return Category.findById({
                _id: category_id,
                store_id:req.body.store_id
            })
            .then(categories => {
               if(!categories){
                throw('Category does not exist')
               }else{
                return true
               }
            })
            .catch(e =>{
                throw new Error(e)

            })
        }),
        // body('veg', 'Item is Veg is required').isBoolean(),
        body('status', 'Status is required').isBoolean(),
        body('price', 'Price is required').isNumeric(),
        
    ];
}
static getProducts(){
    return [ 
        query('category_id', 'Category ID is required').isString()
        // .custom((store_id, {req})=>{
        //     return Store.findById({
        //       _id:store_id
        //     })
        //     .then(store => {
        //        if(!store){
        //         throw('Resturant does not exist')
        //        }else{
        //         req.store = store;
        //         if(store.user_id == req.user.aud) return true

        //         return true
        //        }
        //     })
        //     .catch(e =>{
        //         throw new Error(e)

        //     })
        // }),
        
        // body('category_id', 'Category ID is required').isString()
        // .custom((category_id, {req})=>{
        //     return Category.findById({
        //         _id: category_id,
        //         store_id:req.body.store_id
        //     })
        //     .then(categories => {
        //        if(categories){
        //         throw('Category does not exist')
        //        }else{
        //         return true
        //        }
        //     })
        //     .catch(e =>{
        //         throw new Error(e)

        //     })
        // }),
        
       
    ];
}


}
