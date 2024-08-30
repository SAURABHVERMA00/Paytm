const express = require("express");
const app=express();

const mongoose=require('mongoose')

const port =3000;
const cors=require('cors')
const bodyParser = require('body-parser');



mongoose.connect('mongodb+srv://saurabh2271be22:3GXTWJUgoP6PFPCv@cluster0.hs9twnu.mongodb.net/Paytm').then(()=>{
    console.log("Connected to database");
}).
catch((err)=>{
    console.log("Error connecting to database",err);
})

//  import middleware
var cookieParser = require('cookie-parser');
const userRoute=require('./routes/user')
const {checkForAuthenticationUser}=require('./middleware/auth')





// middleware
app.use(cors())

app.use(express.json())
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(checkForAuthenticationUser("token"))


app.use('/api/v1/paytm/user',userRoute)

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})


