var jwt = require('jsonwebtoken').promises;
const jwtAccessKey=require('/data/data/com.termux/files/home/mongodbAllClass/searchPagination/secret.js');
const createJSONWebToken= (payload, secretKey, {expireIn})=>{
  const token = jwt.sign(payload, secretKey, expireIn );
  return token;
}
module.exports={createJSONWebToken};
