const villageController=require('/data/data/com.termux/files/home/mongodbAllClass/mvc/controllers/villageController.js');
const {uploadfile}=require('/data/data/com.termux/files/home/mongodbAllClass/middleware/fileUpload.js');
const express=require('express');
const villageRoute=express.Router();
villageRoute.post('/utmarchar',uploadfile.single("image"),villageController)
module.exports=villageRoute;