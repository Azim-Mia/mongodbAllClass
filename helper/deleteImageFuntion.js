const cteateError= require('http-errors');
const fs= require('fs').promises;
const deleteImagePath=(imagePath)=>{
  fs.access(imagePath)
  .then(()=> console.log("successFull delete image"))
  catch((error)=>console.log("not delete image"))
}
module.exports=deleteImagePath;