const {simpleSchema}=require('/data/data/com.termux/files/home/mongodbAllClass/mvc/models/schema.js');
const createError=require('http-errors');
const getUser=(req,res,next)=>{
  try{
 res.send('hello2');   
  }catch(error){
    next(error);
  }
}
const createUser=async(req,res,next)=>{
  try{
 const {name,password}=req.body; 
 create= new simpleSchema({
   name:name,
   password:password,
 })
 const resust= await create.save();
 res.status(200).json({
   message:'success',
   user:resust,
 })
  }catch(error){
    next(error);
  }
}
module.exports={getUser,createUser};