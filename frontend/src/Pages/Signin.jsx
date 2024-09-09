import React from 'react'
import { Outlet , useNavigate } from 'react-router-dom'
import Heading from '../Components/Heading'
import SubHeading from '../Components/SubHeading'
import InputBox from '../Components/InputBox'
import Button from '../Components/Button'
import BottomWarning from '../Components/BottomWarning'
import axios from 'axios'


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SignIn = () => {
  const navigate = useNavigate()  
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  
  const [message, setMessage] = React.useState("");
  const notify = () => toast(message);

  const sendBackendData = async () => {
    // console.log('Data sent to backend :', email, password)
    try{
      const response=await axios.post('http://localhost:3000/api/v1/paytm/user/signin/',{
        email,
        password
      },{
        headers:{
          'Content-Type':'application/json',
         
          
        } 
      })
     
      // set token in local storage 
      localStorage.setItem('token',response.data.token)
      setMessage(response.data.message);
      notify()
      
      navigate('/dashboard')

    }catch(error){
      console.log('Error sending data to backend :', error)
    }
  }

  return (


   <>
   <div className='bg-slate-300 h-screen flex justify-center'>
        <div className='flex flex-col justify-center'>
            <div className='rounded-lg bg-white w-80 text-center p-2 h-max px-4'>
                <Heading label='Signin'/>
                <SubHeading label='Enter your credential to access your account'/>
                <InputBox onChange={e=>{setEmail(e.target.value)}}   label='Email' placeholder='saurabh123@gmail.com' required/>
                <InputBox onChange={e=>{setPassword(e.target.value)}}  label='Password' placeholder='123456' required/>
                <div className='pt-4'>
                    <Button onClick={
                      sendBackendData
                    } label="SignIn"  />
                    <ToastContainer />
                </div>
                <BottomWarning label={"Don't have a account? "} buttonText='Signup' to="/" />
            </div>

        </div>
      <Outlet />
    </div>
   </>
  )
}

export default SignIn