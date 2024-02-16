const {uploadfile}=require("/data/data/com.termux/files/home/mongodbAllClass/searchPagination/middleware/fileUpload.js")
const deleteController= require('/data/data/com.termux/files/home/mongodbAllClass/searchPagination/mvc/controllers/delete.js')
const express=require('express');
const deleteRouter=express.Router();
deleteRouter.post('/pic',uploadfile.single("image"),deleteController) ;
module.exports= deleteRouter;