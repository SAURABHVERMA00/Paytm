const { User  } = require("../models/user");
const  Account  = require("../models/bank");
const { createHmac, randomBytes } = require("node:crypto");
const {createTokenForUser} =require('../service/auth');

const {checkForAuthenticationUser} = require("../middleware/auth");

async function userSignUp(req, res) {
  const { username, password, firstName, lastName, phoneNumber, email } =
    req.body;
  if(!username || !password || !firstName || !lastName || !phoneNumber || !email){
    return res.status(411).json({
      message:"Fill all fields" 
    })
  }
  const user = await User.findOne({ email });
  if (user) {
    return res.status(411).json({
      message: "User already exists",
    });
  }
  const newUser = new User({
    username,
    password,
    firstName,
    lastName,
    phoneNumber,
    email,
  });


  await newUser.save();

  
  const userId = newUser._id; 

  await Account.create({
    userId: userId,
    balance:1+Math.floor(Math.random()*10000)

  })

    return res.json({message:"User created successfully"});

  
  


}

async function userSignIn(req, res) {
  const { email, password } = req.body;
    
  try {
    const token = await User.usermatchPasswordtokenGenerator(email, password);
  
    return res.json({message:"User logged in successfully" ,token});

  } catch(error) {
    // console.log(error); 
    res.status(401).send({ error: "Invalid email or password" });
  }
}



function userLogout(req, res) {
  console.log(req.cookies.token);
  res.clearCookie("token").send("User logged out successfully");
}





async function userChangePassword(req,res){
  const {username,password,firstName,lastName, phoneNumber,email}=req.body;
  const {success}=signSchema.safeParse(req.body);

  if(!success){
      return res.status(411).json({
          message:"Invalid data"
      })
  }


      // Extract token from cookies
  const token = req.cookies.token; // Assuming the token is stored in a cookie named 'authToken'\

  // console.log(token);
  if (!token) {
      return res.status(401).json({
          message: "Unauthorized"
      });
  }
  
      // verify token 
  let payload;

  try{
      // console.log(token);
      payload=checkForAuthenticationUser('token');
      // console.log(payload);

  }catch(error){
      return res.status(401).json({
          message:"Invalid token"
      })
  }
  

  const user=await User.findOne({
      email:email
  });


  if(!user){
      return res.status(411).json({
          message:"User does not exists"
      })
  }

  if (username) user.username = username;
  if (firstName) user.firstName = firstName;
  if (lastName) user.lastName = lastName;
  if (phoneNumber) user.phoneNumber = phoneNumber;


  if(password){
      const salt=randomBytes(16).toString();
      const hashedPassword=createHmac("sha256",salt).update(password).digest("hex");
      user.salt=salt;
      user.password=hashedPassword;

  }

  await user.save();
  

 
  res.status(201).json({message:"User updated successfully"})

  // return res.redirect("/")
}





async function userFindByName(req,res) {
  const filter=req.query.filter || "";

  const users=await User.find({
    $or:[{
      firstName:{
        "$regex":filter
      }
    },{
      lastName:{
        "$regex":filter
      }
    }]
  })  


  res.json({
    user:users.map(user=>({
        username:user.username,
        firstName:user.firstName,
        lastName:user.lastName,
        _id:user._id
    }))
  })
 
  
}



module.exports = {
  userSignUp,
  userSignIn,
  userLogout,
  userChangePassword,
  userFindByName,

};
