import { body, query } from "express-validator";


// return [
//     body('banner','Banner Image is required').isArray
//     .custom((,{}) => {

//     })
//     .then( => {

//     })
//     .catch(e => {

//     })
// ];


export class subCategoryValidator {

    static addSubCategory(){
        return [
           
            body('category_id', 'Category ID is required').isString(),
            body('name', 'Name is required').isString(),
            body('status', 'Status is required').isString(),
         ];
    }

    static getSub_Cat(){
       return[
        query('categoryId','Sub Category ID is required').isString()
       ]
       
    }
}