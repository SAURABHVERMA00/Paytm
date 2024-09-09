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
const cookieParser = require('cookie-parser');
const userRoute=require('./routes/user')
const amountRoute=require('./routes/amount')
const {checkForAuthenticationUser}=require('./middleware/auth')





// middleware
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
    credentials: true, // Allow credentials (cookies) to be sent
}));
  
const corsOptions = {
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Necessary for including cookies and auth headers
};
app.use(cors(corsOptions)); // Use CORS for all routes

app.use(express.json())
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// app.use(checkForAuthenticationUser("token"))


app.use('/api/v1/paytm/user',userRoute)

app.use('/api/v1/paytm/account',amountRoute)



app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})


