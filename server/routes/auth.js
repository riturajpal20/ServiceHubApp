const express=require('express');
const router=express.Router();
require('../db/conn');
const multer=require('multer');
const {SignupUser,RegisterUser,LoginUser}= require("../models/userSchema");
const cron =require('node-cron');
const Token=require("../models/token");
const sendEmail=require("../utils/sendEmail");
const crypto=require("crypto");
const moment = require('moment-timezone');
//multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); // Set the destination directory for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Set the file name
  }
});
const upload = multer({ storage: storage });
// Promises...
// router.post('/register',(req,res)=>{
//     const {email,password,rpassword,phone,fname,lname }=req.body;
//     if(!email||!password|| !rpassword|| !phone|| !fname|| !lname){
//         return res.status(422).json({error:"please add all fields"});
//     }
//     User.findOne({email:email}).then((userExist)=>{
//             if(userExist){
//                 return res.status(422).json({error:"Email already exist"});
//             }
//             const user =new User({email,password,rpassword,phone,fname,lname });
//             user.save().then(()=>{
//                 res.status(201).json({message:"user registered sucsessfully"});
//             }).catch((err)=>res.status(500).json({error:"Failed register"}));
//             }).catch(err=>{console.log(err)});
   
// });
// //Asynchronus....& Await
const isValidPhoneNumber = (phoneNumber) => {
  return phoneNumber.length === 10;
};
// labour registration
router.post('/register',upload.single('image'),async(req,res)=>{
    const {email,password,cpassword,phone,fname,lname,service,gender,country,state,city,experience}=req.body;
  
    if(!email ){
        return res.status(422).json({error:"please add all fields"});
    }
    if(password!=cpassword){
      return res.status(422).json({error:"password does not matches confirm password"});
      window.alert('password does not matches confirm password');
    }
    if (!isValidPhoneNumber(phone)) {
      return res.status(422).json({error:"Invalid phone number. It should be 10 digits"});
      window.alert("Invalid phone number. It should be 10 digits.");
    }
    try{
      console.log("hi from server");
      console.log(city);
        let userExist=await RegisterUser.findOne({email:email});
        if(userExist){
            return res.status(422).send({error:"Email already exist"});
        }
         userExist =new RegisterUser({email,password,cpassword,phone,fname,lname,service,gender,country,state,city,experience,
          image:req.file?req.file.path:null
          });
        await userExist.save();
        const token=await new Token({
          userId:userExist._id,
          token:crypto.randomBytes(32).toString("hex")
        }).save();
        const url=`${process.env.BASE_URL}users/${userExist._id}/verify/${token.token}`;
        await sendEmail(userExist.email,"verification mail",url);
        res.status(201).send({message:"user registered sucsessfully email sent to your account plaese verify"});
    } catch(err){
      console.log("hi from server");
      console.log(city);
        res.status(422).send({message:"Unsuccesful registration"});
    } 
    
});
// search labour 
router.get('/getdata',async(req,res)=>{
    try{
 const myData= await RegisterUser.find({});
 res.send({status:"ok",data:myData});
    } catch(error){
        console.log(error);
    }
 
});
// upadte isbooked to true
router.put('/api/update/:id',async(req,res)=>{
    try{
        const {id}=req.params;
        const {isbooked}=req.body;
  
        const updatedData=await RegisterUser.findByIdAndUpdate(id,{isbooked},{new:true});
        if (!updatedData) {
            return res.status(404).json({ error: 'Data not found' });
          }
         return res.status(201).json({success:true});

        } catch (error) {
          console.error("Error is occuring",error);
          res.status(500).send('Internal Server Error');
    }
});
// verification link from gmail 
router.get('/users/:id/verify/:token',async(req,res)=>{
  try{
    const user=await RegisterUser.findOne({_id:req.params.id});
    if(!user)return res.status(400).send({
      message:"invalid link"
    });
    const token=await Token.findOne({
      userId:user._id,
      token:req.params.token,
    });
    if(!token)return res.status(400).send({message:"invalid link"});
    await RegisterUser.updateOne({_id: user._id}, { $set: { verified: true } });
    await token.deleteOne();
    console.log("verified");
    res.status(200).send({message:"Email verified Successfully"})
  }catch(err){
    console.log(err);
    res.status(500).send({message:"Internal server eror"});
  }
});
//user signup
router.post('/signup', async (req, res) => {
  const { name, email,password } = req.body; 
  if (!name || !email ||  !password)  {
      return res.status(422).json({ error: "please filled the field properly" });
  }
  try {
      const userExist = await SignupUser.findOne({ email: email });
      if (userExist) {
          return res.status(422).json({ error: "Email already Exist" });

      }
      const user = new SignupUser({ name, email, password});  
      const userRegister = await user.save();
      if (userRegister) {
          res.status(201).json({ message: "user register successfully" });
      }
      else {
          res.status(500).json({ error: "Failed to register" });
      }
  }
  catch (error) {
      console.log(error);
  }

  
});
//post the feedback
router.post('/feedback',async (req,res)=>{
  console.log("hii from server feedback");
  const { feedbacks, labourId,rating } = req.body;
  // console.log('Type of rating:', typeof rating);
  // console.log('Value of rating:', rating);
  try{
    console.log('Value of rating:', rating);
    console.log('Type of rating:', typeof rating);
    const user=await RegisterUser.findById(labourId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log(rating);
    user.feedback.push({
      comment:feedbacks,
      rating:rating,
      dateOfComment:moment().tz("Asia/Kolkata").format()
    })
    await user.save();
    res.status(201).json({message:"feedback added successfully"});
    
  }  catch(err){
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//get the feedback
// user login
router.post('/signin', async(req, res) => {
  try {
      const { email, password } = req.body;
      if (!email || !password) {
          return res.status(400).json({ error: "plz fill the data" });
      }

      const userLogin = await SignupUser.findOne({ email: email });
      // console.log(userLogin);
      // console.log(userLogin.name);
      if (!userLogin) {
          res.status(402).json({ error: "plz fill the data" });
          
      }
      else {
      const { _id, name, email } = userLogin;
      res.json({
        message: "User Signin Successfully",
        user: { _id, name, email }
      });
      }
  }
  catch (err) {  
      console.log(err);
  }
});
// task scheduler
// 0 0 * * *
cron.schedule('0 0 * * *', () => {
    console.log('Updating isbooked field...');
    updateIsBookedField();
  });
  async function updateIsBookedField() {
    try {
      const filter = { isbooked: true }; 
      const updateOperation = {
        $set: {
          isbooked: false,
        },
      };
      const result = await RegisterUser.updateMany(filter, updateOperation);
    } catch(err){
        console.log(err);
    }
  };
module.exports=router;
