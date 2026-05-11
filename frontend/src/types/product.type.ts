export interface Product{
  id:number
  name:string
  price:number
  stock:number
  imageUrl:string | File
  quantity?:number,
  discount:number,
  category:{name:string},
  description?:string
} 