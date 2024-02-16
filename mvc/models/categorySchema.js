const {Schema,model}=require('mongoose');
//product Schema
const categorySchema= new Schema({
  name:{
    type:String,
  },
  slug:{
    type:String,
  },
},{timestams:true}) 
const Category= new model('category', categorySchema);
module.exports=Category;