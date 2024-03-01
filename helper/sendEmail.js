const createError=require('http-errors');
const emailWithNodeMailer=require('/data/data/com.termux/files/home/mongodbAllClass/helper/emails.js');
const sendEmail=async(emailData)=>{
    try{
  await emailWithNodeMailer(emailData); // email.js  at akta helper funtion
    }catch(emailError){
      throw createError(400, "Not send your enail");
    }
}
module.exports= sendEmail;

