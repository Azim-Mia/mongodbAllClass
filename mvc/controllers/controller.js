const cloudinary=require('/data/data/com.termux/files/home/mongodbAllClass/config/cloudinary.js');
const mongoose=require('mongoose')
const jwt=require('jsonwebtoken');
const {jwtActivationKey,smtpUser,smtpPassword,clientUrl}=require('/data/data/com.termux/files/home/mongodbAllClass/secret.js');
const sendEmail=require('/data/data/com.termux/files/home/mongodbAllClass/helper/sendEmail.js');
const {errorResponse, successResponse}=require('/data/data/com.termux/files/home/mongodbAllClass/responseHandle/responsehandle.js');
const {findWithId}=require('/data/data/com.termux/files/home/mongodbAllClass/servises/findSingleUser.js');
const createError=require('http-errors');
let {User}=require('/data/data/com.termux/files/home/mongodbAllClass/mvc/models/schema.js');
const searchUser=async(req,res,next)=>{
  try{
   const search=req.query.search || "";
   const page=Number(req.query.page) || 1;
   const limit=Number(req.query.limit) || 6;
    const searchRegExp=new RegExp('.*' + search + '.*', 'i');
    const filter={
      isAdmin:{$ne:true},
     $or:[
  {name:{$regex:searchRegExp}},
   {email:{$regex:searchRegExp}},
  {phone:{$regex:searchRegExp}},
        ],
    };
  const options= {password:0, _id:0,email:0};
  const users=await User.find(filter,options)
  .limit(limit)
  .skip((page-1) * limit);
  const count= await User.find(filter).countDocuments();
  if(!users) throw createError(404,"not found users");
 return successResponse(res,{
   statusCode:200,
 message:'user was return successfull',
 payload:{
 users,
   pagination:{
    totalPage:Math.ceil(count/limit),
    correntPage:page,
    previousePage:page-1>0 ? page-1:null,
    nextPage:page+1 < Math.ceil(count/limit) ? page + 1:null,
    },
 },
  });
}catch(error){
  if(error instanceof mongoose.Error){
   next(createError(404,'Invalid search user Id')) 
   return
  }
  next(error);
}
  };
  
const createUser=async(req,res,next)=>{
  const {name, email, password,image,phone,address,isAdmin,isBaned}=req.body;
  const user= await User.findOne({name:req.body.name});
  if(user) return res.send("user exit");
  const users= await User({
    name:name,
    email:email,
    password:password,
    image:image,
    phone:phone,
  });
   const result=await users.save()
successResponse(res,{
 success:true,
 statusCode:300,
 message:"successfull",
});
}
const updateUser=async(req,res,next)=>{
  try{
   const userId=req.params.id;
//  onst matchId=await User.findOne({_id:id});
   const options={password:0};
  await findWithId(User,userId,options);
   const updateOptions= { new:true, runValidators:true, context:'query'};
   let updates={};
  if(req.body.name){
     updates.name=req.body.name;
  throw createError(404, "missing users");  
   }
   if(req.body.password){
   updates.password=req.body.password;  
   throw createError(404, "missing password");  
   }
   if(req.body.image){
   updates.image=req.body.image;
  throw createError(404, "missing image");   
   }
   if(req.body.phone){
   updates.phone=req.body.phone;
   throw createError("missing image");  
   }
   if(req.body.address){
   updates.address=req.body.address;  
   }
 /*  for(let key in req.body){
    if(['username', 'password', 'image', 'phone', 'address'].includes(key)){
      updates[key]=req.body[key];
    }
  }*/
  const updatesNewUsers=await User.findByIdAndUpdate(userId,updates, updateOptions)
  if(!updatesNewUsers){
    throw createError("not update")
  };
    return successResponse(res,{
      statusCode:201,
      success:true,
      message:"successfull",
      payload:{updatesNewUsers},
    })
  }catch(error){
  console.error('Error:', error.message)  
  }
};
const deleteImagePath=require('/data/data/com.termux/files/home/mongodbAllClass/Helper/deleteImageFuntion.js');
const deleteSingleUser=async(req,res,next)=>{
  try{
    const id= req.params.id;
/*const options={password:0};
 const user= await findWithId(User,id, options);
 const imagePath=user.image;
await deleteImagePath (imagePath)*/
const deletes=await User.findByIdAndDelete({_id:id, isAdmin:false});
if(!deletes) {throw createError(409, " data base a kono ai name user nai")};
return successResponse(res,{
    success:true,
    message:"successfull delete",
    payload:{},
  })
  }catch(error){
    next(error)
  }
};
const allUser= async(req,res)=>{
  const users=await User.find();
  await successResponse(res,{
    statusCode:202,
    message:"getAll user successFull",
    payload:{users},
  })
};

const findSingle=async(req,res,next)=>{
 try{
  const id=req.params.id;
 const item= await findWithId(User,id);
 //const item= await User.findOne({_id:id});
  return successResponse(res,{
    statusCode:201,
    message:"successfull",
    payload:{item},
  });
 }catch(error){
  next(error);
}
};
const clearUser=async(req,res,next)=>{
  const id =req.params.id;
  const user= await User.deleteOne({_id:id});
  return successResponse(res,{
   statusCode:300,
   message:"delete successFull",
   payload:{user},
  })
}
const {createJSONWebToken}=require('/data/data/com.termux/files/home/mongodbAllClass/Helper/jwttokenkey.js');
const processRegister=async(req,res,next)=>{
  const {name,email,password,image,phone,address}=req.body;
//const imageBufferString=req.file.buffer.toString('base64'); //problem recherse korte hobe buffering problem
/*if(!req.file){
  throw createError(404, "Image is  required false");
}
if(req.file>1024*1024*2){
  throw createError("image size two mb out length")
}*/
const Exists= await User.exists({email:email});
if(Exists) return res.send("Exists Users"); 
const token= await createJSONWebToken({name,email,password,image,phone,address},jwtActivationKey,'10m');
const emailData={
  email,
  subject:'Active Account Email',
  html:`<h2>Hello User</h2>
  <div>Verify your email</div><div><a href="${clientUrl}/api/users/activate/${token} " target="_blank ">Active Accound</a></div>
  `
};
sendEmail(emailData); //ati akti email send Funtion
return successResponse(res,{
 success:true,
 message:`please go to your ${email} compleate your process`,
payload:{token},
});
}
const acctiveUserAccount=async(req,res,next)=>{
  try{
    const token=req.body.token;
  if(!token) throw createError(404, " token is not found");
 const decoded=await jwt.verify(token,jwtActivationKey);
// console.log(decoded)
const image=decoded.image;
if(image){
  const response = await cloudinary.uploader.upload(image,{
    folder:'ecommerce',
  });
  decoded.image=response.secure_url;
}
const users= await User.create(decoded) //confuse ase aktu
return successResponse(res,{
 success:true,
 message:`please go to your compleate your process`,
 payload:{users}
});
}catch(error){
  next(error.message)
}
}
const updateUserTwo=async(req,res,next)=>{
  const userId=req.params.id;
  const update=await User.findByIdAndUpdate({_id:userId},
  {
    $set:[{
    name:"md: Azim",
    },
    ],
  });
return successResponse(res,{
  statusCode:201,
  success:true, 
  message:"User succcessFul",
  payload:{update},
})
}

module.exports={searchUser, allUser,createUser,findSingle,clearUser,deleteSingleUser,processRegister,acctiveUserAccount,updateUserTwo,updateUser};
