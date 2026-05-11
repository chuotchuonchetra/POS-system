export interface Product{
  id:number
  name:string
  price:number
  stock:number
  imageUrl:string
  quantity?:number
  discount:number
  categoryId?:number
  category:{name:string},
  description?:string
} 
