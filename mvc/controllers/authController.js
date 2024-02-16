let {User}=require('/data/data/com.termux/files/home/mongodbAllClass/searchPagination/mvc/models/schema.js');
require('cookie-parser');
const mongoose=require('mongoose');
const jwt = require('jsonwebtoken');
const {findWithId}=require('/data/data/com.termux/files/home/mongodbAllClass/searchPagination/servises/findSingleUser.js');
const {jwtAccessKey,jwtActivationKey,clientUrl,forgetPasswordKey,refreshTokenKey}=require('/data/data/com.termux/files/home/mongodbAllClass/searchPagination/secret.js');
const bcrypt=require('bcryptjs');
const createError=require('http-errors');
const {errorResponse, successResponse}=require('/data/data/com.termux/files/home/mongodbAllClass/searchPagination/responseHandle/responsehandle.js');
const {createJSONWebToken}=require('/data/data/com.termux/files/home/mongodbAllClass/Helper/jwttokenkey.js');
const {setAccessTokenCookie,setRefreshTokenCookie,setForgetPasswordCookie}=require('/data/data/com.termux/files/home/mongodbAllClass/searchPagination/helper/cookie.js');
const emailWithNodeMailer=require('/data/data/com.termux/files/home/mongodbAllClass/searchPagination/helper/emails.js');
const cheakUserExsist=require('/data/data/com.termux/files/home/mongodbAllClass/searchPagination/helper/cheakUserEmailExists.js');
const sendEmail=require('/data/data/com.termux/files/home/mongodbAllClass/searchPagination/helper/sendEmail.js');
const registerProcess=async(req,res,next)=>{
    const {name,email,password,image,phone,address}=req.body;
    const emailMatch= await User.findOne({email:email});
    if(emailMatch){
      res.send(`<h1>User Already Resgister</h1>`);
    }
//await cheakUserExsist(email);
const token= await createJSONWebToken({name,email,password,image,phone,address},jwtActivationKey,'10m');
const emailData={
  email,
  subject:'Active Account Email',
  html:`<h2>Hello User</h2>
  <div>Verify your email</div><div><a href="${clientUrl}/api/users/active/${token}" target="_blank">Active Accound</a></div>
  `
}; 
try{
await emailWithNodeMailer(emailData); 
}catch(error){
  next(createError(500, "this fail to send verify email"));
  console.log(error)
  return;
} //email send korar funtion helper a
return successResponse(res,{
 success:true,
 message:`please go to your ${email} compleate your process`,
payload:{token},
});
};
const loginProcess=async(req,res,next)=>{
  try{
  const {email,password}=req.body;
const user=await User.findOne({email});
  if(!user){
    throw createError(401,"user not match");
  }
  const isPasswordMatch= await bcrypt.compare(password, user.password);
  if(!isPasswordMatch){
    throw createErrorr(401,"password not match");
  }
  if(user.isBanned){
  throw createErrorr(402," user was banned");  
  }
 const accessToken=createJSONWebToken({user},jwtAccessKey,'2m');
  setAccessTokenCookie(res,accessToken);//helper
  const refreshToken= await createJSONWebToken({user},refreshTokenKey,'40m');
  setRefreshTokenCookie(res,refreshToken);//helper
 /* const withOutPassword =await User.findOne({email}).select('-password');*/ // other rule
   const withOutPassword =await user.toObject();
    delete withOutPassword.password;
 // res.end('successFull cookie');
 return successResponse(res,{
    success:true,
    message:"successFull",
    payload:{withOutPassword},
  })
}catch(error){
if(error instanceof mongoose.Error){
   next(createError(404,'Invalid search user Id')) 
   return
  }
  next(error);
}
  }
const getSingleUser=async(req,res,next)=>{
  //console.log(req.user); // verify decoded repleace distucture =req.user=decoded.user
   const user=await User.findOne()
  successResponse(res,{
    success:true,
    message:"successFull",
    payload:{user},
  })
 }
const handleLogOut=(req,res,next)=>{
  try{
const accessToken=res.clearCookie('accessToken');
const refreshToken=res.clearCookie('refreshToken');
if(accessToken){
  res.redirect('/login');
}
}catch(error){
 console.error("error:__", error.message); 
}
}

const banUserById=async(req,res,next)=>{
  try{
    //const userId=req.body.id;
    const userId= await User.findOne();
    //await findWithId(User,userId);
    const updates={isAdmin:true};
    const updateOptions= {new:true,runValidators:true, context:'query'};
    const updateUser=await User.findByIdAndUpdate(
      userId,
    updates,
    updateOptions,
      ).select('-password');
      if(!updateUser){
        throw createError(404, 'not Update user Unban');
      }
    return successResponse(res,{
      statusCode:201,
      success:true,
      message:"successFull user Id ban.",
    });
  }catch(error){
    return next(error);
  }
}

const unBanUserById=async(req,res,next)=>{
  try{
    const userId= await User.findOne();
    const updates={isAdmin:false};
    const updateOptions= {new:true,runValidators:true, context:'query'};
    const updateUser=await User.findByIdAndUpdate(
      userId,
    updates,
    updateOptions,
      ).select('-password');
      if(!updateUser){
        throw createError(404, 'not Update findByIdAndUpdate proplem');
      }
    return successResponse(res,{
      statusCode:201,
      success:true,
      message:"successFull user unBanUserById.",
    });
  }catch(error){
    return next(error);
  }
}
const userUpdatePassord=async(req,res,next)=>{
  try{
const {email,oldPassword,newPassword}=req.body;
const user= await User.findOne({email:email});
if(!user){
  throw createError(404,'not match email');
}
const matchPassword= await bcrypt.compare(oldPassword, user.password);
if(!matchPassword){
 throw createError(404, 'not found password');
}
const userId= user._id;
const updates={password:newPassword};
const updateOptions={new:true};
 const userUpdates=await User.findByIdAndUpdate(
  userId,
   updates,
   updateOptions
   );
    return successResponse(res,{
      statusCode:201,
      success:true,
      message:"successFull update",
      payload:{userUpdates},
    });
  }catch(error){
    return next(error);
  }
};
const userForgetPassword=async(req,res,next)=>{
  const {email}=req.body;
   const userData=await User.findOne({email:email});
   if(!userData){
  //    throw createError(404, "not Found Email.Please register now.");
  return res.send('not match Email');
   }
  const forgetPasswordToken= await createJSONWebToken({userData},forgetPasswordKey,"40m");
setForgetPasswordCookie(res, forgetPasswordToken);//helper
   const emailData={
  email,
  subject:'Active Account Email',
  html:`<h2>Hello User</h2>
  <div>Forget  your email password</div><div><a href="${clientUrl}/api/users/forgetPassword/${forgetPasswordToken}" target="_blank ">forget Password Accound</a></div>
  `
}; 
await sendEmail(emailData);
return successResponse(res,{
    success:true,
    message:`succcessFul ${email} forget password`,
    payload:{forgetPasswordToken},
});
};
const userResetPassword=async(req,res,next)=>{
  try{
    const {token,password}=req.body;
    const decoded= jwt.verify(token, forgetPasswordKey);
    if(!decoded){
      throw createErrorr(404, "not token or expaire token");
    }
    const userEmail={email:decoded.userData.email};
    const updates= {password:password};
    const updateOptions={new:true};
  const updateResult= await User.findOneAndUpdate(
    userEmail,
    updates,
    updateOptions
      );
    return successResponse(res,{
      success:true,
      message:"successfull reset Password",
      payload:{},
    })
  }catch(error){
    return next();
  }
}
const refreshTokenGenaret=async(req,res,next)=>{
  try{
  const oldRefeshToken= req.cookies.refreshToken;
    const decodedToken= jwt.verify(oldRefeshToken,refreshTokenKey);
    if(!decodedToken){
   throw createErrorr(404, "Not Found Refresh Token. plsese logIn now");
  }
 const accessToken=await createJSONWebToken(decodedToken.user,jwtAccessKey,'20m');
  res.cookie('accessToken',accessToken,{
    maxAge:20*60*1000,
    httpOnly:true,
   // secure:true,
    sameSide:'none',
    date:new Date(),
  });
  return successResponse(res,{
    success:true,
    message:"successfull refresh Token",
  })
  }catch(error){
    return next(error)
  }
}
const protektedToken=async(req,res,next)=>{
  try{
    const accessToken= req.cookies.accessToken;
  const decoded= jwt.verify(accessToken, jwtAccessKey);
  if(!decoded){
    throw createErrorr(404,"not Found accessToken, Please login now");
  }
return successResponse(res,{
  success:true,
  message:"success refressToken"
});
  }catch(error){
    return next(error);
  }
}
const cheackCookie=(req,res,next)=>{
   const token=req.cookies.accessToken;
   if(!token){
     res.send("not fount accessToken")
   }
   res.status(200).json({
     success:true,
    accessToken: token
   })
}
module.exports= {loginProcess,handleLogOut,getSingleUser,registerProcess,banUserById,unBanUserById,userUpdatePassord,userForgetPassword,userResetPassword,refreshTokenGenaret,protektedToken,cheackCookie};