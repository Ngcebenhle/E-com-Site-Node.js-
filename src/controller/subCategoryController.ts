
import subCategory from "../Models/subCategory";



export class subCategoryController {

    static async addSubCategory(req, res, next){
     
     const name = req.body.name;
     const status = req.body.status;
     const category_id = req.body.category_id;
     // const status = req.body.status
     // const path = req.file.path
    try{
     let data: any = {
      category_id, 
      name
     }
     if(req.file) data = {...data, photo: req.file.path}
       const sub_categories = await new subCategory(data).save();
       res.send(sub_categories)
    } 
    catch(e){
       next(e)
    }
  
    }

    static async getSubCategory(req, res, next){
      const category_id = req.query
        try{
            const sub_categories = await subCategory.find({
               // category_id:category_id
            })
           // .populate('restaurant_id');
            res.send(sub_categories)
       }
       catch(e){
          next(e)
       }
    }

    static async getSubCategoryByCategory(req, res, next){
      const category_id = req.params.category_id
      try{
          const sub_categories = await subCategory.find(
             {
           category_id:category_id
          },
          {__v: 0}
         )
         // .populate('restaurant_id');
          res.send(sub_categories)
     }
     catch(e){
        next(e)
     }
  }
}