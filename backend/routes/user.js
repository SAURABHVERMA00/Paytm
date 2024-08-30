const {Router}=require('express');
const router=Router();


// Import the user Schema



const {userSignUp,userSignIn,userLogout,userChangePassword}=require('../controller/user');


//Routes
router.post('/signup',userSignUp);

router.post('/signin',userSignIn);

router.get("/logout",userLogout);

router.put("/updatePassword",userChangePassword);




module.exports=router;