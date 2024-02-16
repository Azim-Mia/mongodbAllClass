const {Schema, model}=require('mongoose');
const {defaultImagePath}=require("/data/data/com.termux/files/home/mongodbAllClass/searchPagination/secret.js");
const schema= new Schema({
  
  name:{
    type:String,
  },
  profile_img:{
    type:String,
  },
  cloudinary_id:{
    type:String,
  },
})
const UserCloudinary= new model('dds', schema);
module.exports= UserCloudinary;
