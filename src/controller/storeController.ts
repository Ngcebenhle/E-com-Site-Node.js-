import store from "../Models/Store";
import { utils } from "../utils/utils";
import userModel from '../Models/userModel'
import Category from "../Models/Category";
import banner from "../Models/banner";
import Store from "../Models/Store";
export class storeController {

    static async addStore(req, res, next){
     
     const store = req.body;
     const user = req.user;
    //  const path = req.file.path;
     const verification_token = utils.tokenGen()
     try{
        // create store user
        const hash =  await utils.encriptPassword(store.password)
       const data = {
        email: store.email,
        verification_token_opt:verification_token,
        verification_token_opt_timeout: Date.now() + utils.token_timeout(),
        phone: store.phone,
        password:hash,
        name: store.name,
        type: 'store',
           status: 'active'
        }
        const NewUser = await new userModel(data).save();
        
        

      //create store 
      const loc = JSON.parse(store.location)
      let store_data: any = {
        name: store.name,
        location: loc,
        address: store.address,
        status: store.status,
        city_id: store.city_id,
        user_id: user.userId,
      };
      if(req.file) store_data = {...store_data, photo: req.file.path}
      if(store.description) store_data = {...store_data, description:store.description}
      if(store.openTime) store_data = {...store_data, openTime:store.openTime}
      if(store. closeTime) store_data = {...store_data,  closeTime:store. closeTime}
      
       // Save to Model in MongoDB
      const Newstore = await new Store(store_data).save();
        
       
        res.json({
           Success: true,
        //    store_data
        })

//    const categories_info ={
    
//             // create categories

//     // const categorieData = JSON.parse(store.categories).map(x =>{
//     //     return {name: x, store_id: Newstore._id}
//     // });
//     // const categories = Category.insertMany(categorieData)
//    }

     }
     catch(e){
        next(e)

     }
    
    
    }

    static async searchByIDStore(req, res, next){
           const name = req.param
           console.log(name)
        try{
            const store = await Store.find({
                name:name,
                status:'active',
               
            });
            res.send(store)
         }
         catch(e){
            next(e)
    
         }
    }
    static async getstore(req, res, next){
        
        try{
            const store = await Store.find({
                status:'active',
               
            });
            res.send(store)
         }
         catch(e){
            next(e)
    
         }
    }

    static async getNearBystoreAndBanner(req, res, next){
         
        const METERS_PER_KM = 1000;
        const data = req.query

        const perPage = 10;
        const currentPage = parseInt(req.query.page) || 1
        const prevpage = currentPage == 1 ? null : currentPage -1;
        let nextPage = currentPage + 1; 
        try{
           
            const store_doc_count = await Store.countDocuments({
                status:'active',
                location: {
                    // $nearSphere: {
                    //     $geometry:{
                    //         type: 'Point',
                    //         coordinates: [parseFloat(data.lng), parseFloat(data.lat)]
                    //     },
                    //     $maxDistance: data.radius * METERS_PER_KM
                    // }

                    $geoWithin: {
                        $centerSphere: [
                            [parseFloat(data.lng), parseFloat(data.lat)],
                            (parseFloat(data.radius)/1.6) / 3963.2
                        ]
                    }
                }
              })

              if(!store_doc_count){
                res.json({
                    store: [],
                    perPage,
                    currentPage,
                    prevpage,
                    nextPage:null,
                    totalPages:0
                  })
              }
              const totalPages = Math.ceil(store_doc_count/perPage);
              if(totalPages == 0 || totalPages == currentPage){
                nextPage = 0;
              }
              if(totalPages < currentPage){
                throw('No more stores available')
              }
    


            const store = await Store.find({
                status:'active',
                location: {
                    // $nearSphere: {
                    //     $geometry:{
                    //         type: 'Point',
                    //         coordinates: [parseFloat(data.lng), parseFloat(data.lat)]
                    //     },
                    //     $maxDistance: data.radius * METERS_PER_KM
                    // }

                    $geoWithin: {
                        $centerSphere: [
                            [parseFloat(data.lng), parseFloat(data.lat)],
                            (parseFloat(data.radius)/1.6) / 3963.2
                        ]
                    }
                }
            })
            .skip((currentPage * perPage) - perPage)
            .limit(perPage);

            
            const Banner = await banner.find({})
            // res.json(
            //    {
            //     banner,
            //     store
            //    }
            // );
            res.json({
                store,
                perPage,
                currentPage,
                prevpage,
                nextPage,
                totalPages
              })
         }
         catch(e){
            next(e)
    
         }
    }

    static async searchStore(req, res, next){
         
        const METERS_PER_KM = 1000;
        const data = req.query

        const perPage = 10;
        const currentPage = parseInt(req.query.page) || 1
        const prevpage = currentPage == 1 ? null : currentPage -1;
        let nextPage = currentPage + 1; 
        try{

            // const store_doc_count = await Store.countDocuments({
            //     status:'active',
            //     name:{$regex: data.name,$options: 'i'},
            //     location: {
            //         // $nearSphere: {
            //         //     $geometry:{
            //         //         type: 'Point',
            //         //         coordinates: [parseFloat(data.lng), parseFloat(data.lat)]
            //         //     },
            //         //     $maxDistance: data.radius * METERS_PER_KM
            //         // }

            //         $geoWithin: {
            //             $centerSphere: [
            //                 [parseFloat(data.lng), parseFloat(data.lat)],
            //                 (parseFloat(data.radius)/1.6) / 3963.2
            //             ]
            //         }
            //     }
            //   })
              
            //   if(!store_doc_count){
            //     res.json({
            //         store: [],
            //         perPage,
            //         currentPage,
            //         prevpage,
            //         nextPage:null,
            //         totalPages:0
            //       })
            //   }
            //   const totalPages = Math.ceil(store_doc_count/perPage);
            //   if(totalPages == 0 || totalPages == currentPage){
            //     nextPage = 0;
            //   }
            //   if(totalPages < currentPage){
            //     throw('No more stores available')
            //   }
    

            const store = await Store.find({
                status:'active',
                name:{$regex: data.name,$options: 'i'},
                location: {
                    // $nearSphere: {
                    //     $geometry:{
                    //         type: 'Point',
                    //         coordinates: [parseFloat(data.lng), parseFloat(data.lat)]
                    //     },
                    //     $maxDistance: data.radius * METERS_PER_KM
                    // }

                    $geoWithin: {
                        $centerSphere: [
                            [parseFloat(data.lng), parseFloat(data.lat)],
                            (parseFloat(data.radius)/1.6) / 3963.2
                        ]
                    }
                }
            })
            // .skip((currentPage * perPage) - perPage)
            // .limit(perPage);

           
            const Banner = await banner.find({})
            // res.json(
            //    {
            //     banner,
            //     store
            //    }
            // );
             
            res.json({
                store,
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
    
}