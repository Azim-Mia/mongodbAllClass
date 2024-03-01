const Category=require('/data/data/com.termux/files/home/mongodbAllClass/mvc/models/categorySchema.js');
const data={
  productArray:[
  {
  name:"symPhone",
  slug:"azin-gg",
  },
    {
  name:"symPhone",
  slug:"azin-gg",
  },
    ],
};
const categorySeedProduct=async(req,res,next)=>{
  await Category.deleteMany();
 const category= await Category.insertMany('category',productAdd)
await Category.push(category);
 res.send(category);
}
module.exports=categorySeedProduct;