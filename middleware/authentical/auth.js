const jwt=require('jsonwebtoken');
const createError=require('http-errors');
let {User}=require('/data/data/com.termux/files/home/mongodbAllClass/searchPagination/mvc/models/schema.js');
const {jwtAccessKey}=require('/data/data/com.termux/files/home/mongodbAllClass/searchPagination/secret.js');
const isLoggedIn=(req,res,next)=>{
  try{
 const token=req.cookies.accessToken;
 if(!token){
   res.render('register');
 }
 const decoded=jwt.verify(token, jwtAccessKey);
// console.log(decoded)
 if(!decoded){
    throw createError(401,'Not verify token, try again');
 }
 req.user=decoded.user;// cheak kora je isAdmin isBanned
 //accessAll user isAdmin hole
 next();
  }catch(error){
    return next(error);
  }
}
const isLoggedOut=async (req,res,next)=>{
  try{
    const cookie=req.cookies.accessToken;
    if(!cookie){
    throw createError(404,"user Already log 0ut");
    }
    next();
  }catch(error){
    return next(error)
  }
}
const isAdmined=async (req,res,next)=>{
  try{
    //req.user Login korar somoy decoded theke dewa hoi
    //other (!req.user.isAdmin)
    const admin= await User.findOne({isAdmin:true})
    if(!admin){
      throw createError(401, 'user is Not Admin. must be addmin than not success Your request');
    }
    next();
  }catch(error){
    return next(error)
  }
}
module.exports={isLoggedIn,isLoggedOut,isAdmined};