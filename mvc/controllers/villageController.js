const createError=require('http-errors');
const UtmarChar=require('/data/data/com.termux/files/home/mongodbAllClass/searchPagination/mvc/models/utmarcharSchema.js')
const villageController=async(req,res,next)=>{
  try{
   const {name,fatherName,motherName,email,nid,birth,divition,district,thana,union,village ,description,address,postCode,home,image}=req.body;
   const nids= await UtmarChar.exists({nid:nid});
   const births= await UtmarChar.exists({birth:birth});
   const emails= await UtmarChar.exists({email:email});
  if(nids || births || emails){
    res.send("user exit");
  } 
    const createUser=await UtmarChar({
    name:name,
    fatherName:fatherName,
    motherName:motherName,
    email:email,
    nid:nid,
    birth:birth,
    divition:divition,
    district:district,
    thana:thana,
    union:union,
    village:village,
    description:description,
    address:address,
    postCode:postCode,
    homeNo:home
    });
  const userData= await createUser.save();
    res.status(201).json({
      success:true,
      message:"successFull user",
      user:userData,
    })
  }catch(error){
    next(error)
  }
}
module.exports=villageController;