const {
isLoggedIn,
isLoggedOut,
isAdmined
}=require('/data/data/com.termux/files/home/mongodbAllClass/searchPagination/middleware/authentical/auth.js');
const {handleCategory,handleGetAllCategorys,handleGetOneCategory,
  handleUpdateCategory,handleDeleteCategory
}=require('/data/data/com.termux/files/home/mongodbAllClass/searchPagination/mvc/controllers/categoryController.js');
const categorySeedProduct=require('/data/data/com.termux/files/home/mongodbAllClass/searchPagination/mvc/controllers/categorySeedController.js');
const categoryValidationName=require('/data/data/com.termux/files/home/mongodbAllClass/searchPagination/src/validatos/categoryValidators.js');
const {runValidation}=require('/data/data/com.termux/files/home/mongodbAllClass/searchPagination/src/validatos/index.js');
const express=require('express');
const categoryRouter=express.Router();
categoryRouter.post('/createCategory',categoryValidationName,runValidation,isAdmined,handleCategory);
categoryRouter.get('/getAllCategorys',handleGetAllCategorys);
categoryRouter.get('/getOneCategory/:slug',isAdmined,handleGetOneCategory);
categoryRouter.put('/updateOneCategory/:slug',isAdmined,handleUpdateCategory);
categoryRouter.delete('/deleteOneCategory/:slug',isAdmined,handleDeleteCategory);
module.exports=categoryRouter;