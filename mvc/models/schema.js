const bcrypt=require('bcryptjs');
const {defaultImagePath}=require("/data/data/com.termux/files/home/mongodbAllClass/searchPagination/secret.js");
const {Schema,model}=require('mongoose');
const schema= new Schema({
  name:{
   type:String,
   trim:true,
   minLength:[3, 'minimum length three charecter'],
   mixLength:[30, 'minimum length thirty charecter'],
   required:[true, 'no empty User name'],
   lowercase:true,
  },
  email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required:[true, 'no empty Email'],
        validate: {
    validator: function(v) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        },
        required: [true, "Email required"]
    },
  password:{
   type:String, 
   required:[true, 'no empty Password'],
  set:(v)=>bcrypt.hashSync(v,bcrypt.genSaltSync(10)),
  },
  image:{
  // type:String,
//  default:{image:defaultImagePath},
  public_id:{
    type:String,
  },
  url:{
  type:String,  
  }
  },
  phone:{
    type: String,
    required:[true, 'no empty Phone'],
    required:[true, "please Enter phone"],
  },
  address:{
    required:[true, 'no empty Address'],
   type:String, 
  },
  isAdmin:{
   type:Boolean,
   default:false,
  },
  isBanned:{
    type:Boolean,
    default:false,
  },
},{timestams:true});
const User=new model("user", schema);
//simpleSchema
const simple=new Schema({
  name:{
    type:String,
  },
 email:{
    type:String,
  },
  password:{
    type:String,
  },
});
const simpleSchema= new model('simpleSchema',schema);
module.exports={User,simpleSchema};