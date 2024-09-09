const {Router}=require('express');
const router=Router();


// Import the user Schema



const {userSignUp,userSignIn,userLogout,userChangePassword , userFindByName}=require('../controller/user');


//Routes
router.post('/signup',userSignUp);

router.post('/signin',userSignIn);

router.get("/logout",userLogout);

router.put("/updatePassword",userChangePassword);



router.get("/findUser",userFindByName);

module.exports=router;