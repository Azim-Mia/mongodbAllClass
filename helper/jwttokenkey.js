var jwt = require('jsonwebtoken');
const createJSONWebToken= (payload, secretKey, {expireIn})=>{
  const token = jwt.sign(payload, secretKey, expireIn );
  return token;
}
module.exports={createJSONWebToken};
