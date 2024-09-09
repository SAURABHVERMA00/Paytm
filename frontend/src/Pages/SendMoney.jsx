import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SendMoney = () => {
    const [searchParams] = useSearchParams();
    const id=searchParams.get('id')
    const name=searchParams.get('name')
    const [amount,setAmount]=useState(0)

    const [message, setMessage] = useState("");

    const notify = () => toast(message);

    const intiateTransfer=async()=>{
       

        try{
            
            const response =await axios.post("http://localhost:3000/api/v1/paytm/account/transfer",{
                to:id,
                amount
            },{
                headers:{
                    "Content-Type":"application/json",
                    'Authorization':`Bearer ${localStorage.getItem('token')}`

                    
                    
                },
              
            }
            );
             
            setMessage(response.data.message);
            notify()
        }catch(err){
            console.log(`Error initiating transfer ${err}`);
        }
    }
    



  return (
    <div className='flex justify-center h-screen bg-gray-100'>
        <div className='h-full flex  flex-col  justify-center'>
            <div className='border h-min text-card-foreground max-w-md p-4  space-y-8  w-96 bg-white shadow-lg rounded-lg'>
                <div className='flex flex-col space-y-1.5 p-6'>
                    <h2 className='text-3xl font-bold text-center'>SendMoney</h2>

                </div>
                <div className='p-6     '>
                    <div className='flex items-center space-x-4     '>
                        <div className='w-12 h-12 rounded-full bg-green-500 flex items-center justify-center'>
                            <span className='text-2xl text-white'>{name[0]}</span>

                        </div>
                        <h3 className='text-3xl font-semibold'>{name}</h3>

                    </div>
                    <div className='space-y-4'>
                        <div className='space-y-2'>
                            <label className='text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                            for="amount">
                                Amount
                            </label>
                            <input 
                            onChange={(e)=>{
                                setAmount(e.target.value)
                            }}
                            type="text"
                            className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'
                            id="amount"
                            placeholder='Enter Amount'
                             />


                        </div>
                        <div>
                            <button onClick={
                                intiateTransfer
                                
                            } type="button" className='justify-center items-center rounded-md text-sm font-bold ring-offset-background transition-colors h-10 px-4  bg-green-500 w-full text-white ' >
                                Initiate Transfer  

                            </button>
                            <ToastContainer />
                        </div>
                    </div>
                </div>

            </div>

        </div>


    </div>
  )
}

export default SendMoney