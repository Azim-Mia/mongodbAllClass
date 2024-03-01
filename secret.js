require('dotenv').config();
const server_port= process.env.SERVER_PORT || 5000
const db_url=process.env.DB_URL || 'mongodb://locahost:27017/mongodbAllClass';
const defaultImagePath=process.env.DEFAULTIMAGE || 'images/users/azim10(8).jpg';
const jwtActivationKey=process.env.JWTTOKENKEY || 'fhfgyyfyftddf_gh'
const jwtAccessKey=process.env.JWT_ACCESS_KEY || "access_key";
const forgetPasswordKey=process.env.JWT_FORGET_PASSWORD || "forget_password_key";
const refreshTokenKey=process.env.JWT_REFRESH_PASSWORD || "refreshToken_key";
const smtpUser=process.env.SMTP_USERNAME || '';
const smtpPassword=process.env.SMTP_PASSWORD || '';
const clientUrl=process.env.CLINT_URL || '';
const dirImagePath=process.env.DEFAULTIMAGE || 'public/images/users';
const file_dir= process.env.FILE_DIR || '/data/data/com.termux/files/home/mongodbAllClass/public/images/users';
const imagePath="data/data/com.termux/files/home/mongodbAllClass/mvc/controllers/public/Camera/image.jpg";
module.exports={server_port,db_url ,defaultImagePath,jwtActivationKey ,smtpUser,smtpPassword, clientUrl, jwtAccessKey,forgetPasswordKey,refreshTokenKey,dirImagePath,file_dir,imagePath};