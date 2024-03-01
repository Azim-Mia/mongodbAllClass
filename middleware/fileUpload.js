/*const {fileStore,v}=require("/data/data/com.termux/files/home/mongodbAllClass/searchPagination/secret.js");
const multer=require('multer');
const createError=require('http-errors');
//const path=require('path');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,v);
  },
  filename: function (req, file, cb){
    const extname =Date.now()+'_'+file.originalname;
    cb(null, extname);
  },
});
const upload=multer({storage:storage});
//file filtaring kora holo koto mb file nibe tarbiboton
module.exports={upload};

const storage =multer.memoryStorage();
const fileFilter= (req, file, cb)=>{
 if(!file.mimetype.startsWith("image/")){
  return cb(new Error("must be type image"),false);
  }
 if(file.size>MAX_FILE_SIZE){
  return cb(new Error("File size maxcimum over exit."),false); 
 }
  if(!ALLOWED_FILE_TYPE.includes(file.mimetype)){
  return cb(new Error("File type not allow."),false);  
  }
  cb(null, true);
};
const upload = multer({ storage: storage
//fileFilter:fileFilter,
});
//module.exports= {upload}
*/
const {file_dir}=require("/data/data/com.termux/files/home/mongodbAllClass/secret.js");
const multer  = require('multer')
const storage = multer.diskStorage({
destination: function (req, file, cb) {
    cb(null,file_dir)
  },
  filename: function (req, file, cb) {
    const name=Date.now() +'-'+ file.originalname;
    cb(null, name);
  }
});

const uploadfile = multer({ storage: storage })
module.exports={uploadfile};