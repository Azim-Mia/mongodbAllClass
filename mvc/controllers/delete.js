const UserCloudinary=require("/data/data/com.termux/files/home/mongodbAllClass/mvc/models/delete.js");
const {jwtAccessKey,jwtActivationKey,clientUrl,forgetPasswordKey,refreshTokenKey}=require('/data/data/com.termux/files/home/mongodbAllClass/secret.js');
const cloudinary=require("/data/data/com.termux/files/home/mongodbAllClass/config/cloudinary.js");
const deleteController= async(req,res,next)=>{
 /*const {imagePath}=require('/data/data/com.termux/files/home/mongodbAllClass/searchPagination/secret.js');
 const image=req.body.image;
if(!image){
  res.send("not found image")
}
setTimeout(()=>{ 
 cloudinary.uploader.upload(image,{folder:"file"},(error, result)=>{
  if(error){
    res.send(error.message)
  }else{
    res.send("success")
  }
});
    },6000);
     */
     const image=req.query.image
     if(!image){
       res.send("not found image")
     }
  try {
    // Upload image to cloudinary
    const result =await cloudinary.uploader.upload(image,{folder:"file"},(err,data)=>{
      if(err){
        res.send("false")
      }else{
        res.send("success true")
      }
    });
    // Create new user
    let user = new UserCloudinary({
      name: req.query.name,
      profile_img: result.secure_url,
      cloudinary_id: result.public_id,
    });
    // save user details in mongodb
   // await user.save();
    res.status(200)
      .send({
        message:'success',
        user:user,
      });
  } catch (err) {
    console.log(err);
  }
};
module.exports = deleteController;