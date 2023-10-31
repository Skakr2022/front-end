import { ProductCategory } from "./ProductCategory";

export interface Product{
  
         productId : number,
         imageUrl : string,
         description : String,
         name : String,
         creationDate : Date,
         lastUpdate : Date,
         category : ProductCategory
  
     

}