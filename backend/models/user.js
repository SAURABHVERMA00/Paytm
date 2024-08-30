const mongoose=require('mongoose')
const { createHmac,randomBytes } = require("node:crypto");

const { createTokenForUser } = require("../service/auth");
const { kMaxLength } = require('node:buffer');
const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        minLength:3,
        maxLength:20

    },
    password:{
        type:String,
        required:true,
        minLength:6,
    },
    firstName:{
        type:String,
        required:true,
        trim:true,
        maxLength:20
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
        maxLength:20
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
   
    salt:{
        type:String
    },
    role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER"
    }


    
}  , {timestamps:true})


userSchema.pre("save", function (next) {
    const user = this;
    if (!user.isModified("password")) {
      return;
    }
  
    const salt =randomBytes(16).toString() ;
  
    const hashedPassword = createHmac("sha256", salt)
      .update(user.password)
      .digest("hex");
  
    this.salt = salt;
    this.password = hashedPassword;
  
    next();
  });

    userSchema.static("usermatchPasswordtokenGenerator",async function (email,password){
        const user=await this.findOne({email});

        if (!user) {
            throw new Error("User not found");
        
        }
        const salt=user.salt;
        const hashedPassword=user.password;
        console.log("Stored Salt:", salt);
        
       
        const userProvidedPassword=createHmac("sha256",salt)
        .update(password)
        .digest("hex");
       
     
        if(hashedPassword!==userProvidedPassword){
            console.log("Password mismatch detected");
            console.log("Expected:", hashedPassword);
            console.log("Actual:", userProvidedPassword)
            throw new Error("Password does not match");
        }

        const token=createTokenForUser(user);
        return token;

    })






  

const User=mongoose.model('User',userSchema);



module.exports={User};





