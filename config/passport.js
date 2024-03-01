let User=require('/data/data/com.termux/files/home/mongodbAllClass/mvc/models/schema.js');
const createError=require('http-errors');
const bcrypt=require('bcryptjs')
const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
passport.use(new LocalStrategy(
  async(username, password, done)=>{
  const pass= bcrypt.compare(password, username.password);
  if(!pass){
    throw createError(500, "not match password");
  }
   await User.findOne({ username},
    async(err, user) =>{
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
     /*if (!user.verifyPassword(password)) { return done(null, false); }*/
     return done(null, user);
    });
  }
));

passport.serializeUser(async(user, done)=> {
 await done(null,user.id)
});

passport.deserializeUser(async(id, done) =>{
try{
  const user=await User.findById(id)
  done(null, user)
}catch(error){
  done(error, false)
}
});