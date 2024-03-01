const {getUser,createUser}=require('/data/data/com.termux/files/home/mongodbAllClass/mvc/controllers/simpleController.js')
const express=require('express');
const simpleRouter=express.Router();
simpleRouter.get('/getUser',getUser);
simpleRouter.post('/addUser',createUser);
module.exports=simpleRouter;