require('dotenv').config();
const deleteRouter=require('/data/data/com.termux/files/home/mongodbAllClass/searchPagination/mvc/routers/delete.js');
const cloudinary=require('/data/data/com.termux/files/home/mongodbAllClass/searchPagination/config/cloudinary.js');
const UserCloudinary=require('/data/data/com.termux/files/home/mongodbAllClass/searchPagination/mvc/models/delete.js');
const {uploadfile}=require('/data/data/com.termux/files/home/mongodbAllClass/searchPagination/middleware/fileUpload.js');
const UtmarChar=require('/data/data/com.termux/files/home/mongodbAllClass/searchPagination/mvc/models/utmarcharSchema.js');
const villageRoute=require('/data/data/com.termux/files/home/mongodbAllClass/searchPagination/mvc/routers/villageRoute.js')
let {User}=require('./mvc/models/schema.js');
const {validateUserRegistation,loginValidation}=require('/data/data/com.termux/files/home/mongodbAllClass/searchPagination/src/validatos/auth.js');
const {runValidation}=require('/data/data/com.termux/files/home/mongodbAllClass/searchPagination/src/validatos/index.js');
const {isLoggedIn,isAdmined}=require('/data/data/com.termux/files/home/mongodbAllClass/searchPagination/middleware/authentical/auth.js');
const {createJSONWebToken}=require('/data/data/com.termux/files/home/mongodbAllClass/Helper/jwttokenkey.js');
const {errorResponse, successResponse}=require('/data/data/com.termux/files/home/mongodbAllClass/searchPagination/responseHandle/responsehandle.js');
 const routers= require('/data/data/com.termux/files/home/mongodbAllClass/searchPagination/mvc/routers/router.js');
 const authRouter= require('/data/data/com.termux/files/home/mongodbAllClass/searchPagination/mvc/routers/authRouter.js');
 const categoryRouter=require('/data/data/com.termux/files/home/mongodbAllClass/searchPagination/mvc/routers/categoryRouter.js');
 const seedProductRouter=require('/data/data/com.termux/files/home/mongodbAllClass/searchPagination/mvc/routers/seedProductRouter.js');
 const productRouter=require('/data/data/com.termux/files/home/mongodbAllClass/searchPagination/mvc/routers/productRouter.js');
 const simpleRouter=require('/data/data/com.termux/files/home/mongodbAllClass/searchPagination/mvc/routers/simpleRouter.js');
 
///require('/data/data/com.termux/files/home/mongodbAllClass/searchPagination/config/productDB');
const {jwtAccessKey}=require('/data/data/com.termux/files/home/mongodbAllClass/searchPagination/secret.js');
const bodyParser=require('body-parser');
const express=require('express');
const cors=require('cors');
const cookieParser = require('cookie-parser')
const createError=require('http-errors');
const jwt=require('jsonwebtoken');
const passport=require('passport');
const session=require('express-session');
const MongoStore = require('connect-mongo');
const cookie=require('cookie-parser');
const ejs=require('ejs');
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use(cookie());
//app.use(Multer.array())
app.use(express.static('public'))
app.set('view engine', 'ejs');
app.use('/api/users', routers);
app.use('/api/auth', authRouter);
app.use('/api/simple', simpleRouter);
app.use('/api/category',categoryRouter)
app.use('/api/seed',seedProductRouter)
app.use('/api/product',productRouter);
app.use('/api/village', villageRoute)
 /* const image=req.body.image;
  const user= await Dd({
image:image,
  });
const images=  await user.save();
*/

/*app.get('/pic' ,(req,res,next)=>{
  res.render('delete');
})*/
app.use('/', deleteRouter);
app.get('/',(req,res,next)=>{
  res.render('index');
})
app.get('/home',(req,res,next)=>{
  res.render('index');
})
app.get('/login',(req,res,next)=>{
  res.render('login');
})
app.get('/profile',isLoggedIn,isAdmined,(req,res,next)=>{
  res.render('profile');
})
app.get('/logout',(req,res,next)=>{
  res.render('logout');
})
app.get('/register',isLoggedIn,(req,res,next)=>{
  res.render('profile');
})
app.get('/logout',(req,res,next)=>{
  res.clearCookie('azim');
})
app.get('/activeAccounts',(req,res,next)=>{
  res.render('activeAccount');
})
app.get('/updatePassword',(req,res,next)=>{
  res.render('updatePassword');
});
app.use((req,res,next)=>{
  next(createError(404, "Not founds routers"));
});
app.use((err,req,res,next)=>{
  res.status(err.status || 500).json({
    success:"false",
    message:err.message,
  });
});
module.exports=app;