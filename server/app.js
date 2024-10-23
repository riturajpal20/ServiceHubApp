const dotenv=require('dotenv');
const mongoose=require('mongoose');
const express =require('express');
const cors = require('cors');
const app=express();
const path=require('path')
dotenv.config({path:'./config.env'});
require('./db/conn');
const cron =require('node-cron');
app.use(express.json());
app.use(cors({origin:true}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const PORT=process.env.PORT || 5000;

// const User=require('./models/userSchema');
app.use(require('./routes/auth'));


// middleware checks the neccesary steps and authentication
// between the routes eg .. if i want to go to about section 
//  then before giving the client actual about page i as a developer
// wants the user to be logined first so i can setup a middleware between 
// the home page and the about page which checks 
// whether the user is logined or not . 

app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`);
})

// cron.schedule('* * * * * *',()=>{
//     console.log('running the task');
// })
