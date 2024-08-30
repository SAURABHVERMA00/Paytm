const jwt = require('jsonwebtoken');
const {userSecretKey}=require('../config');

function createTokenForUser(user){
    const payload={
        _id:user._id,
        username:user.username,
        phoneNumber:user.phoneNumber,
        email:user.email,
        role:user.role
    };
    const token=jwt.sign(payload,userSecretKey,{expiresIn:"1d"});

    return token;
}


const  validateToken=(token)=>{
    const payload=jwt.verify(token,userSecretKey);

    return payload;
}
module.exports={
    createTokenForUser,
    validateToken
}