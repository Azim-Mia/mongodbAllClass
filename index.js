const app=require('./app.js');
const {server_port}= require('./secret.js');
const dbconnect=require("/data/data/com.termux/files/home/mongodbAllClass/config/db.js")
app.listen(server_port, ()=>{
  console.log(`Azim Your server Ready : http://localhost:${server_port}`);
  dbconnect();
});
