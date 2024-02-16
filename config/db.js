const logger=require('/data/data/com.termux/files/home/mongodbAllClass/searchPagination/mvc/controllers/winstonLoggerController.js');
const {db_url}=require('/data/data/com.termux/files/home/mongodbAllClass/searchPagination/secret.js');
const mongoose=require('mongoose');
const dbconnect=async(option={})=>{
  try{
 await mongoose.connect(db_url,option);
 logger.log('info','db connecttion successfull');
  mongoose.connection.on('error', (error)=>{
   console.error(`mongodb connect problem`, error);
  });
  }catch(error){
  console.error(`server mongoose problem:`, error.toString());
}
}
module.exports=dbconnect;

  