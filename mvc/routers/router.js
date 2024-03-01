let User=require('/data/data/com.termux/files/home/mongodbAllClass/mvc/models/schema.js');
const {validateUserRegistation,
loginValidation}=require('/data/data/com.termux/files/home/mongodbAllClass/src/validatos/auth.js');
const {runValidation}=require('/data/data/com.termux/files/home/mongodbAllClass/src/validatos/index.js');
const {
isLoggedIn,
isLoggedOut,
isAdmined
}=require('/data/data/com.termux/files/home/mongodbAllClass/middleware/authentical/auth.js');
const express=require('express');
const routers=express.Router();
const {
searchUser,
allUser,
getSingleUser,
createUser, 
findSingle,
clearUser,
deleteSingleUser,
processRegister,
acctiveUserAccount,
updateUserTwo,
updateUser}=require('/data/data/com.termux/files/home/mongodbAllClass/searchPagination/mvc/controllers/controller.js');
const {uploadfile}=require('/data/data/com.termux/files/home/mongodbAllClass/searchPagination/middleware/fileUpload.js');
//routers.get('/',getUser); 
routers.get('/search', searchUser);
routers.get('/getAllUser',allUser);
routers.get('/:id',findSingle);
routers.get('/:id',updateUserTwo);
routers.post('/userAdd', uploadfile.single("image"), createUser);
routers.post('/register',uploadfile.single("image"),
validateUserRegistation,
runValidation,
processRegister);
routers.post('/verify',acctiveUserAccount);
routers.post('/:id',findSingle);
routers.delete('/:id', deleteSingleUser);
//routers.put('/:id',updateUser);
routers.put('/azim/:id',updateUserTwo);
module.exports=routers;