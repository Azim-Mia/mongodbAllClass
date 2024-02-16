const {createLogger,format,transports}= require('winston');

const logger =createLogger({
  level:'info',
  format:format.combine(
    format.timestamp({format:'YYYY-MM-DD HH:mm:ss'}),
    format.json()
    ),
  transports: [
 new transports.Console({format:format.combine(format.colorize(),format.simple())
    }),
    //file toiri kora jai
  /*  new transports.File({
     filename:"/data/data/com.termux/files/home/mongodbAllClass/searchPagination/info.log",
     level:"info",
     maxsize:5588059,
     maxFile:5,
     message:"my name azim",
    }),*/
    ]
});
module.exports=logger;