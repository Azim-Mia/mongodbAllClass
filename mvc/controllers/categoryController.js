const slugify=require('slugify');
const {categoryServiceItem,findAllCategorisService,findOneCategoryService,updateCategorySarvice,deleteOneCategoryService}=require('/data/data/com.termux/files/home/mongodbAllClass/servises/categoryService.js')
let Category=require('/data/data/com.termux/files/home/mongodbAllClass/mvc/models/categorySchema.js');
const createError=require('http-errors');
const {errorResponse, successResponse}=require('/data/data/com.termux/files/home/mongodbAllClass/responseHandle/responsehandle.js');

const handleCategory=async(req,res,next)=>{
  try{
  const name=req.body.name;
 const newCategory=await categoryServiceItem(name);
 const result=await newCategory.save();
 return successResponse(res,{
   message:"SuccessFull is create category",
   payload:{result}
 })
  }catch(error){
    console.error(error.message);
  }
}
const handleGetAllCategorys=async(req,res,next)=>{
try{
  const findCategorys= await findAllCategorisService();
  return successResponse(res,{
   message:"SuccessFull is create category",
   payload:{findCategorys}
 })
}catch(error){
  return next(error)
}
}
const handleGetOneCategory=async(req,res,next)=>{
  try{
  const slug=req.params.slug;
  const getOne=await findOneCategoryService(slug)
  if(!getOne){
    //throw createError(404, "Not fount Category");
    res.send("Not Found Category")
  }
  return successResponse(res,{
   message:"SuccessFull is create category",
   payload:{getOne}
 })
  }catch(error){
    return next(error);
  }
}
const handleUpdateCategory=async(req,res,next)=>{
  try{
    const slug=req.params.slug;
  const name=req.body.name;
   const updateFuntion=await updateCategorySarvice(name, slug);
  return successResponse(res,{
   message:"SuccessFull is create category",
   payload:{updateFuntion}
 })
  }catch(error){
    return next(error);
  }
}
const handleDeleteCategory=async(req,res,next)=>{
 try{
   const slug=req.params.slug;
const deleteCategory = await deleteOneCategoryService(slug);
if(!deleteCategory){
throw createError(404, "not found slug");
}
  return successResponse(res,{
   message:"SuccessFull is delete category",
   payload:{}
});
 }catch(error){
   return next(error)
 }
}
module.exports={handleCategory,handleGetAllCategorys,handleGetOneCategory,handleUpdateCategory,handleDeleteCategory};