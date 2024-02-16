let {User}=require('/data/data/com.termux/files/home/mongodbAllClass/searchPagination/mvc/models/schema.js');
const creareError=require('http-errors');
const cheakUserExsist=async(email)=>{
   await User.findOne({email:email})
  if(!email){
    throw creareError(404,"not fount user Email");
    return;
  }
}
module.exports=cheakUserExsist;