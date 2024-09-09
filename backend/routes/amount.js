const express=require('express');
const router=express.Router();


const {getAmount,transferAmount}=require('../controller/amount');

const {checkForAuthenticationUser}= require('../middleware/auth');


//Routes
router.get('/balance',checkForAuthenticationUser,getAmount);

// transfer money
router.post('/transfer',checkForAuthenticationUser,transferAmount);



module.exports=router;