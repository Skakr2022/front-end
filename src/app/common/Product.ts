import { ProductCategory } from "./ProductCategory";

export class Product{
    constructor(
        public productId : number,
        public imageUrl : string,
        public description : String,
        public name : String,
        public creationDate : Date,
        public lastUpdate : Date,
        public productCategory : ProductCategory
  
      ){}

}