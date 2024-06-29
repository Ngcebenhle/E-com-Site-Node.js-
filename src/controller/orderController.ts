import Stripe from 'stripe';
import banner from '../Models/banner'
import cart from '../Models/cart';
import item from '../Models/item';
import order from '../Models/order'
export class orderController {

   //  static async addOrder(req, res, next){
     
   //      const data = req.body;
   //      const user_id = req.user._id
   //      try{
   //         let orderInfo: any = {
   //          // user_id,
   //          //  restaurant_id: data.restaurant_id,
   //          order: data.order,
   //           address: data.address,
   //          status: data.status,
   //          payment_status: data.payment_status,
   //          payment_mode: data.payment_mode,
   //           total: data.total,
   //           grand_Total: data.grand_Total,
   //           delivery_charge: data.delivery_charge,
   //         }

   //         if(data.instruction) orderInfo = {...orderInfo, instruction:data.instruction}
   //         let orderData = await new order(orderInfo).save();
           
   //        res.send(orderData);
   //      }
   //      catch(e){
   //         next(e)
   
   //      }
     
   //      //  res.send('its working');
   //  }

   //  static async getOrder(req, res, next){
   //    const user_id = req.user._id
   //    const perPage = 5;
   //    const currentPage = parseInt(req.query.page) || 1
   //    const prevpage = currentPage == 1 ? null : currentPage -1;
   //    let nextPage = currentPage + 1; 
       
      
   //      try{
   //        const order_doc_count = await order.countDocuments({
            
            
   //          user_id: user_id
   //        })
   //        // if(!order_doc_count){
   //        //   res.json({
   //        //     orders:[],
   //        //     perPage,
   //        //     currentPage,
   //        //     prevpage,
   //        //     nextPage:null,
   //        //     totalPages:0
   //        //   })
   //        // }
   //        // const totalPages = Math.ceil(order_doc_count/perPage);
   //        // if(totalPages == 0 || totalPages == currentPage){
   //        //   nextPage = 0;
   //        // }
   //        // if(totalPages < currentPage){
   //        //   throw('No more Addresses orders available')
   //        // }
   //          const orders = await order.find({
   //             user_id
   //          },
   //          {
   //             user_id: 0, 
   //             __v:0
   //          }
   //       )
   //      //  .skip((perPage * currentPage) - perPage)
   //      //  .limit(perPage)
   //      //  .sort({'created_at': -1}).populate('restaurant_id')
   //      //  .exec()
   //          // res.send(orders);
   //          res.json({
   //            orders,
   //            // perPage,
   //            // currentPage,
   //            // prevpage,
   //            // nextPage,
   //            // totalPages
   //          })
   //       } 
   //       catch(e){
   //          next(e)
    
   //       }
   //  }

   static async addOrder(req, res, next){
     
      const data = req.body;
      const user_id = req.user.userId
      try{

        let products = JSON.parse(data.products)

        // if(req.user.type != 'user'){
        //   throw('un-Authorised user')
        // }
         let orderInfo: any = {
            user_id,
            products: JSON.parse(data.products),
            address: data.address,
            status: data.status,
            payment_status: data.payment_status,
            payment_mode: data.payment_mode,
           total: data.total,
           grand_Total: data.grand_Total,
           delivery_charge: data.delivery_charge,
         }

         if(data.instruction) orderInfo = {...orderInfo, instruction:data.instruction}
         let orderData = await new order(orderInfo).save();
         await cart.findOneAndDelete({user_id});

         
         // req.server_products.map(async(server_product) => {
         //  let product = products.find(x => x._id == server_product._id);
         //  if(server_product.variations?.length == 0){
         //    await item.findById(
         //       product._id,
         //      {
         //      $inc: {stock_unit: (-1) * product.quantity, 'metrics.orders':1}
             
         //    })
          
         //  }else{
         //    let variation = server_product.variations.find(variation => variation.sku && variation.sku == product.sku)
         //    if(variation){
         //      await item.findByIdAndUpdate({
         //        _id: product._id,
         //        'variations.sku':product.sku
         //      },
         //      {
         //        $in: {'variations.$.stock_unit': (-1) * product.quantity, 'metrics.orders':1}
         //      }
         //    );

         //    }else{
         //      await item.findByIdAndUpdate({
         //        _id: product._id,
         //        'variations.size.sku':product.sku
         //      },
         //      {
         //       $inc: {'variations.$.size.$.stock_unit': (-1) * product.quantity, 'metrics.orders':1}
         //      }
         //    );
         //    }
         //  }
         // })


         // const response = {
         //  products: JSON.parse(data.products),
         //  address: orderData.address,
         //  // tracking:orderData.tracking,
         //  instruction:orderData.instruction || null,
         //  status: orderData.status,
         //  payment_status: orderData.payment_status,
         //  payment_mode: orderData.payment_mode,
         //  total: orderData.total,
         //  grand_Total: orderData.grand_Total,
         //  delivery_charge: orderData.delivery_charge,
         // }
       
      }
      catch(e){
         next(e)
 
      }
   
        res.json({
         Success:true
        })
   //   res.send('it works')
   }

  static async getOrder(req, res, next){
    const user_id = req.user._id
    // const perPage = 5;
    // const currentPage = parseInt(req.query.page) || 1
    // const prevpage = currentPage == 1 ? null : currentPage -1;
    // let nextPage = currentPage + 1; 
     
    
      try{
        // const order_doc_count = await order.countDocuments({
        //   user_id: user_id
        // })
        // if(!order_doc_count){
        //   res.json({
        //     orders:[],
        //     perPage,
        //     currentPage,
        //     prevpage,
        //     nextPage:null,
        //     totalPages:0
        //   })
        // }
        // const totalPages = Math.ceil(order_doc_count/perPage);
        // if(totalPages == 0 || totalPages == currentPage){
        //   nextPage = 0;
        // }
        // if(totalPages < currentPage){
        //   throw('No more Addresses orders available')
        // }
          const orders = await order.find({
             user_id
          },
          {
             user_id: 0, 
             __v:0
          }
       )
      //  .skip((perPage * currentPage) - perPage)
      //  .limit(perPage)
      //  .sort({'created_at': -1}).populate('restaurant_id')
      //  .exec()
          // res.send(orders);
          res.json({
            orders
            // products,
            // perPage,
            // currentPage,
            // prevpage,
            // nextPage,
            // totalPages
          })
       } 
       catch(e){
          next(e)
  
       }
  }

  static async StripePayment(req, res, next){
   
    const data = req.body;
    
    try{

      // let products = JSON.parse(data.products)

      // if(req.user.type != 'user'){
      //   throw('un-Authorised user')
      // }
       let orderInfo: any = {
         items: JSON.parse(data.items),
        //  address: JSON.parse(data.address),
        //  status: data.status,
        //  payment_status: data.payment_status,
        //  payment_mode: data.Payment_mode,
        //  total: data.total,
        //  grand_Total: data.grand_Total,
         delivery_charge: data.delivery_charge,
       }

      //  if(data.instruction) orderInfo = {...orderInfo, instruction:data.instruction}
      //  let orderData = await new order(orderInfo).save();
      //  await cart.findOneAndDelete({user_id});

       
      //  req.server_products.map(async(server_product) => {
      //   let product = products.find(x => x._id == server_product._id);
      //   if(server_product.variations?.length == 0){
      //     await item.findById(
      //        product._id,
      //       {
      //       $inc: {stock_unit: (-1) * product.quantity, 'metrics.orders':1}
           
      //     })
        
      //   }else{
      //     let variation = server_product.variations.find(variation => variation.sku && variation.sku == product.sku)
      //     if(variation){
      //       await item.findByIdAndUpdate({
      //         _id: product._id,
      //         'variations.sku':product.sku
      //       },
      //       {
      //         $in: {'variations.$.stock_unit': (-1) * product.quantity, 'metrics.orders':1}
      //       }
      //     );

      //     }else{
      //       await item.findByIdAndUpdate({
      //         _id: product._id,
      //         'variations.size.sku':product.sku
      //       },
      //       {
      //        $inc: {'variations.$.size.$.stock_unit': (-1) * product.quantity, 'metrics.orders':1}
      //       }
      //     );
      //     }
      //   }
      //  })


      //  const response = {
      //   products: JSON.parse(data.products),
      //   address: orderData.address,
      //   // tracking:orderData.tracking,
      //   instruction:orderData.instruction,
      //   status: orderData.status,
      //   payment_status: orderData.payment_status,
      //   payment_mode: orderData.payment_mode,
      //   total: orderData.total,
      //   grand_Total: orderData.grand_Total,
      //   delivery_charge: orderData.delivery_charge,
      //  }

      // const orders = new order(orderInfo).save()
      // res.send(response);


   //   const session = await Stripe.checkout(orderInfo);
   //   res.send(session)
    }
    catch(e){
       next(e)

    }
 
    //   res.send(req.file);
}

static async createCustomer(name: string, email: string){
  try{
    const params: Stripe.CustomerCreateParams = {
      email:email,
      name:name,
      source: '',
      address: {
        line1: 'ABC',
        postal_code: '',
        city: '',
        state: '',
        country: '',
      },
      description: 'customer test',
    }
   //  const customer: Stripe.Customer = await Stripe._stripe.customer.create(params);
   //  console.log(customer.id);
   //  return customer
  }
  catch(e){
    throw(e)
  }
}
} 