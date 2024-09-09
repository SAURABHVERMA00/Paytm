const Account = require('../models/bank');
const mongoose=require('mongoose');
const {User} = require('../models/user');


async function getAmount(req,res){
    // console.log(req.user)
    try{
        // const token = req.user._id;
        const account=await Account.findOne({
            userId:req.user._id
        })
        
        return res.status(200).json({
            amount:account.balance
        })
    }catch(err){
        console.log(err.message);
        return res.status(405).json({
            message:"Error fetching"
        })
    }
}


async function transferAmount(req,res){
    const session= await mongoose.startSession();


    session.startTransaction();
    // in dono ke beech me likhna hota hai jo transaction me hoga

    const {amount,to}=req.body;

    const account=await Account.findOne({
        userId:req.user._id
    }).session(session);


    if(!account || account.balance<amount){
        await session.abortTransaction();
        res.status(400).json({
            message:"Insufficient balance"
        })
    }


    // find to 
    const toaccount=await Account.findOne({userId:to}).session(session);

    if(!toaccount){
        await session.abortTransaction();
        res.status(400).json({
            message:"Invalid account"
        })
    }
    
    
    // Performe the transfer
    await Account.updateOne({userId:req.user._id},{$inc:{balance:-amount}}).session(session);
    await Account.updateOne({userId:to},{$inc:{balance:amount}}).session(session);

    session.commitTransaction();
    console.log("Transfer successful")
    res.json({
        message:"Transfer successful"
    })
}


module.exports={
    getAmount,
    transferAmount
}