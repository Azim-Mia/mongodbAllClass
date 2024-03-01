const seedProductController=require('/data/data/com.termux/files/home/mongodbAllClass/mvc/controllers/seedProductsController.js');
const express=require('express');
const seedProductRouter=express.Router();
seedProductRouter.get('/seedProducts',seedProductController);
module.exports=seedProductRouter;