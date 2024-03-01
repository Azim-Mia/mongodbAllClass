const slugify=require('slugify');
let Product=require('/data/data/com.termux/files/home/mongodbAllClass/mvc/models/productSchema.js');
const {getSingleProductsService,updateSingleProductService}=require('/data/data/com.termux/files/home/mongodbAllClass/servises/productService.js');
const {errorResponse, successResponse}=require('/data/data/com.termux/files/home/mongodbAllClass/responseHandle/responsehandle.js');
const createProduct=async(req,res,next)=>{
  const {name,description,price,image,quantity,shipping,category,rating}=req.body;
//const imageBufferString=req.file.buffer.toString('base64'); //problem recherse korte hobe buffering problem
/*if(!req.file){
  throw createError(404, "Image is  required false");
}
if(req.file>1024*1024*2){
  throw createError("image size two mb out length")
}*/
const Exists= await Product.exists({name:name});
if(Exists) return res.send("Exists Users"); 
const product=await Product.create({
  name:name,
  slug:slugify(name),
  description:description,
  price:price,
  image:image,
  quantity:quantity,
  shipping:shipping,
  category:category,
  rating:rating,
});
return successResponse(res,{
 success:true,
 message:'successFull create product',
 payload:{product}
});
}
const handleGetAllProduct=async(req,res,next)=>{
  try{
    const search=req.query.search || "";
   const page=Number(req.query.page) || 1;
   const limit=Number(req.query.limit) || 6;
    const searchRegExp=new RegExp('.*' + search + '.*', 'i');
    const filter={
     $or:[
  {name:{$regex:searchRegExp}},
  // {email:{$regex:searchRegExp}},
        ],
    };
  const options= {password:0};
  const products=await Product.find(filter)
  .populate('category')
  .limit(limit)
  .skip((page-1) * limit);
  if(!products){
    res.send("not");
  }
  const count= await Product.find(filter).countDocuments();
  if(!products) throw createError(404,"not found products");
   return successResponse(res,{
    success:true,
    message :"successFull",
    payload:{
      products:products,
     pagination:{
      totalProduct:count,
      totalpage:Math.ceil(count/limit),
       currentPage:page,
  previousePage:page-1>0 ? page-1:null,
 nextPage:page+1 < Math.ceil(count/limit) ? page + 1:null,
      },
    },
   });
  }catch(error){
    return next(error);
  }
}

const handleGetSingleProduct=async(req,res,next)=>{
  try{
    const slug=req.params.slug;
   const result=await getSingleProductsService(slug);
   return successResponse(res,{
    success:true,
    message :"successFull",
    payload:{result},
   });
  }catch(error){
    return next(error);
  }
}
const handleSingleProductDelete=async(req,res,next)=>{
  try{
    const slug=req.params.slug;
    const product= await Product.findOneAndDelete({slug})
    if(!product){
      throw createError(404, "not found Product");
    }
  }catch(error){
    return next(error);
  }
}
const handleUpdateSingleProduct=async(req,res,next)=>{
  const {slug}=req.params;
 /* const {name,image}=req.body;
 const slugFind= await Product.findOne({slug:slug});
  if(!slugFind){
    return res.send('not found Slug')
  }
  const result= updateSingleProductService(name,slug,image);*/
// const {name}=req.body;
  const updateOption={new:true,runValidators:true,contex:'query'};

  let updates={};
  const allowedFile=["name","image"];
  for(let key in req.body){
    if(allowedFile.includes(key)){
    updates[key]=req.body[key];  
    }
  }
  if(updates.name){
    updates.slug=slugify(updates.name);
  }
  console.log(updates.name);
  const newUpdate=await Product.findOneAndUpdate(
    {slug},
    updates,
    updateOption
    )
  return successResponse(res,{
    success:true,
    message:'successFull Update product',
    payload:{newUpdate},
  });
}
module.exports={createProduct,handleGetSingleProduct,handleSingleProductDelete,handleUpdateSingleProduct,
  handleGetAllProduct
};