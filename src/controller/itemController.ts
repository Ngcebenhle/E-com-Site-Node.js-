import Category from "../Models/Category";
import banner from "../Models/banner";
import item from "../Models/item";
export class itemController {

  // static async addItem(req, res, next) {
  //   const itemData = req.body;
  //   const path = req.file.path;
  //   try {
  //     //create item
  //     let item_data: any = {
  //       name: itemData.name,
  //       status: itemData.status,
  //       cuisines: itemData.cuisines,
  //       price: itemData.price,
  //       veg: itemData.veg,
  //       category_id: itemData.category_id,
  //       restaurant_id: itemData.restaurant_id,
  //       cover: path,
  //     };
  //     if (itemData.description)
  //       item_data = { ...item_data, description: itemData.description };
  //     const newItem = await new item(item_data).save();
  //     res.send(itemData);

  //     // const data = {
  //     //     banner:path
  //     // }
  //     // let Banner = await new banner(path).save();
  //     // res.send(banner);
  //   } catch (e) {
  //     next(e);
  //   }

  //   //   res.send('it works');
  // }

  // static async getItemMenu(req, res, next) {
  //   try {
  //     const restaurant = req.restaurant;
  //     const restaurantId = req.param.restaurantID;

  //     const categories = await Category.find({
  //       restaurant_id: restaurantId,
  //     });

  //     const items = await item.find({
  //       status: true,
  //       restaurant_id: restaurantId,
  //     });

  //     // res.send(categories);
  //     res.json({
  //       restaurant,
  //       categories,
  //       item,
  //     });
  //   } catch (e) {
  //     next(e);
  //   }
  // }

  static async addItem(req, res, next){
     
    const itemData = req.body;
    const files = req.files
    try{

        
     //create item
     let item_data: any = {
       name: itemData .name,
       status: itemData .status,
      //  cuisines: JSON.parse(itemData .cuisines ),
      //  price: parseInt(itemData .price),
       veg: itemData.veg,
       category_id: itemData.category_id,
       store_id: itemData.store_id,
       // cover:path
     };
     if(itemData.description) item_data = {...item_data, description:itemData.description};
     if(itemData.specification) item_data = {...item_data, specification:itemData.specification};
     if(itemData.sub_category_id) item_data = {...item_data, sub_category_id:itemData.sub_category_id};
     if(itemData.sku) item_data = {...item_data, sku:itemData.sku}
     if(itemData.price) item_data = {...item_data, price:itemData.price}
     if(itemData.stock_unit) item_data = {...item_data, stock_unit:itemData.stock_unit}
      if (files){
       let images = [];
           images = files.map(x => x.path)
           item_data = {...item_data, images}
      }
       const newItem= await new item(item_data).save();
       res.send(newItem);

       // const data = {
       //     banner:path
       // }
       // let Banner = await new banner(path).save();
       // res.send(banner);
    }
    catch(e){
       next(e)

    }
   
       //   res.send(req.file);
   }

   static async getProducts(req, res, next){
       //    const category_id =  req. 
       try{
            const category_id = req.query;
            const sub_category_id = req.query.sub_category_id;

            console.log(category_id)
            let itemsToFind: any  = {
               status: true,
              //  category_id:category_id
            } 
       if(sub_category_id){
           itemsToFind = {...itemsToFind, sub_category_id}
       }
           const products = await item.find(itemsToFind)

          //  res.send('it works');
           res.json({
              products
           })
        }
        catch(e){
           next(e)
   
        }
      
   }
}
