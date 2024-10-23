const mongoose=require('mongoose');
const validator = require('validator');
const bcrypt= require('bcryptjs');
const jwt=require('jsonwebtoken');
const commonFields = {
    email: {
      type: String,
      required: false,
      validate: {
        validator: validator.isEmail,
        message: '{VALUE} is not a valid email',
        isAsync: false,
      },
    },
    password: {
      type: String,
      required: false,
    },
  };

const registerFields={
    // email:{
    //     type:String,
    //     required:false,
    //     validate:{
    //         validator: validator.isEmail,
    //         message: '{VALUE} is not a valid email',
    //         isAsync: false
    //       }
    // },
    // password: {
    //     type:String,
    //     required:false
    // },
    ...commonFields,
    cpassword: {
        type:String,
        required:false
    },
    phone:{
        type:String,
        required:false
    },
    fname: {
        type:String,
        required:false
    },
    lname: {
        type:String,
        required:false
    },
    service:{
        type:String,
        required:false
    },
    experience:{
      type:String,
      required:false,
      default:"0"
    },
    gender:{
        type:String,
        required:false
      },
      image: {
        type: String, // Field to store the image path
        required: false,
      },
      country:{
        type:String,
        required:false
      },
      state:{
        type:String,
        required:false
      },
      city:{
        type:String,
        required:false
      },
      image:{
        type:String,
        default:null
      },
      isbooked:{
        type:Boolean,
        default:false
      },
      verified:{
        type:Boolean,
        default:false
      },
      rating:{
        type:Number,
        default:1.5
      },
      feedback:[{
      comment:{
        type:String,      
        required:false
      },
      rating:{
        type:Number,
        default:0,
        //required:falserr
      },
      dateOfComment: {
        type: Date,
        required: false
      }
      }]

};
const registerSchema=new mongoose.Schema(registerFields);

const signupFields = {
    ...commonFields,
    name: {
        type:String,
        required:true
    },
    tokens:[
      {
        token:{
      type:String,
      required:true
      }
    }
    ]

  };
  const signupSchema = new mongoose.Schema(signupFields);

  // const loginFields = {
  //   ...commonFields,
  // };
  // const loginSchema = new mongoose.Schema( loginFields);
  

const preSaveHook = async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  if (this.cpassword && this.isModified('cpassword')) {
    this.cpassword = await bcrypt.hash(this.cpassword, 12);
  }
  next();
};
registerSchema.pre('save',preSaveHook);
signupSchema.pre('save', preSaveHook);
signupSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;

  }
  catch (err) {
    console.log(err);
  
  }
}
const RegisterUser=mongoose.model('REGISTRATION', registerSchema);
const SignupUser = mongoose.model('SignupUser', signupSchema);
// const LoginUser = mongoose.model('LoginUser', loginSchema);
module.exports={RegisterUser,SignupUser};