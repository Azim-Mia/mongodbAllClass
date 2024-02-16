const express=require('express');
const utmarCharRouter=express.Router();
utmarCharRouter.get('/utmarchar',(req,res)=>{
  res.send("hello");
})
module.exports= utmarCharRouter;
