const {validationResult}=require('express-validator');
const {successResponse}=require('/data/data/com.termux/files/home/mongodbAllClass/searchPagination/responseHandle/responsehandle.js')
const runValidation=async(req,res,next)=>{
  try{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
    return successResponse(res,{
      statusCode:422,
      message: errors.array()[0].msg,
    })  
      return;
    }
  return next()
  }catch(error){
    next(error);
  }
}
module.exports={runValidation};