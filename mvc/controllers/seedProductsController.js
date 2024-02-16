let Product=require('/data/data/com.termux/files/home/mongodbAllClass/searchPagination/mvc/models/productSchema.js');
const createError=require('http-errors');
const data={
  products:[
    {
    name:'smart phone',
    slug:'smart-phone',
    description:'smart phone is very importent divise beacuse comunication methot.All Country comunication information.Our product is very longer',
    price:500,
    image:'smartPhone.jpg',
    quantity: 4,
    shippong:0,
    category:'6546f46daf31926fc5344e1e',
   rating:3.4,
    },
        {
    name:'i phone',
    slug:'i-phone',
    description:'smart phone is very importent divise beacuse comunication methot.All Country comunication information.Our product is very longer',
    price:500,
    image:'smartPhone.jpg',
    quantity: 4,
    shippong:0,
    category:'654882f5329147d5ce78ec89',
   rating:3.4,
    },
        {
    name:'sumsung phone',
    slug:'sumsung-phone',
    description:'smart phone is very importent divise beacuse comunication methot.All Country comunication information.Our product is very longer',
    price:500,
    image:'smartPhone.jpg',
    quantity: 4,
    shippong:0,
    category:'65488304329147d5ce78ec8d',
   rating:3.4,
    },
        {
    name:'itel phone',
    slug:'itel-phone',
    description:'smart phone is very importent divise beacuse comunication methot.All Country comunication information.Our product is very longer',
    price:500,
    image:'smartPhone.jpg',
    quantity: 4,
    shippong:0,
    category:'65488304329147d5ce78ec8d',
   rating:3.4,
    },
    ],
};
const seedProductController=async(req,res,next)=>{
  await Product.deleteMany({});
  const products= await Product.insertMany(data.products);
return res.status(200).json(products);
}
module.exports=seedProductController;