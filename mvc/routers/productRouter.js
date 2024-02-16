const {createProduct,handleGetSingleProduct,handleSingleProductDelete,handleUpdateSingleProduct,
  handleGetAllProduct
}=require('/data/data/com.termux/files/home/mongodbAllClass/searchPagination/mvc/controllers/productController.js');
const {isLoggedIn,isLoggedOut,isAdmined
}=require('/data/data/com.termux/files/home/mongodbAllClass/searchPagination/middleware/authentical/auth.js');
const {upload}=require('/data/data/com.termux/files/home/mongodbAllClass/searchPagination/middleware/fileUpload.js');
const express=require('express');
const productRouter= express.Router();
productRouter.post('/createProduct',isAdmined,createProduct);
productRouter.get('/getAllProducts',handleGetAllProduct);
productRouter.get('/getSingleProduct/:slug',handleGetSingleProduct);
productRouter.delete('/singleProductDelete/:slug',handleSingleProductDelete);
productRouter.put('/updateSingleProduct/:slug',handleUpdateSingleProduct);
module.exports=productRouter;
