const {loginProcess,getSingleUser,handleLogOut,registerProcess,banUserById,
  unBanUserById,userUpdatePassord,userForgetPassword,userResetPassword
,refreshTokenGenaret,protektedToken,cheackCookie}=require('/data/data/com.termux/files/home/mongodbAllClass/mvc/controllers/authController.js')
const{uploadfile}=require('/data/data/com.termux/files/home/mongodbAllClass/middleware/fileUpload.js');
const {validateUserRegistation,loginValidation,forgetPasswordValidation,restPasswordValidation}=require('/data/data/com.termux/files/home/mongodbAllClass/src/validatos/auth.js');
const {runValidation}=require('/data/data/com.termux/files/home/mongodbAllClass/src/validatos/index.js');
//const {isLoggedIn}=require('/data/data/com.termux/files/home/mongodbAllClass/searchPagination/middleware/authentical/auth.js');
var jwt = require('jsonwebtoken').promises;
const {isLoggedIn,isAdmined,isLoggedOut}=require('/data/data/com.termux/files/home/mongodbAllClass/middleware/authentical/auth.js');
const {jwtAccessKey,jwtActivationKey,clientUrl,forgetPasswordKey,refreshTokenKey}=require('/data/data/com.termux/files/home/mongodbAllClass/secret.js');
const cookiePerser=require('cookie-parser');
const express=require('express');
const authRouter = express.Router();
authRouter.use(cookiePerser());
authRouter.get('/cookie', cheackCookie)
authRouter.get('/protekted', protektedToken);
authRouter.put('/updatePassword',userUpdatePassord);
authRouter.post('/forgetPassword',forgetPasswordValidation,runValidation,userForgetPassword);
authRouter.post('/login',loginValidation,runValidation,loginProcess);
authRouter.post('/logout',isLoggedIn,handleLogOut);
authRouter.post('/register',uploadfile.single('image'),validateUserRegistation,runValidation,registerProcess);
authRouter.get('/refresh-token',refreshTokenGenaret);
authRouter.get('/:id',isLoggedIn,getSingleUser)
authRouter.put('/resetPassword',restPasswordValidation,runValidation,userResetPassword);
authRouter.put('/banUser/:id',banUserById);
authRouter.put('/unBanUser/:id',unBanUserById);
module.exports= authRouter;