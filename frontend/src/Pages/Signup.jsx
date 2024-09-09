import React from 'react'
import Heading from '../Components/Heading'
import SubHeading from '../Components/SubHeading'
import InputBox from '../Components/InputBox'
import Button from '../Components/Button'
import BottomWarning from '../Components/BottomWarning'
import { Outlet ,useNavigate} from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import axios from 'axios'
const Signup = () => {
  const navigate = useNavigate()

    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [firstName, setFirstName] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    const [phoneNumber, setPhoneNumber] = React.useState('')
    const [email, setEmail] = React.useState('')

    const [message, setMessage] = React.useState("");
    const notify = () => toast(message);

    const sendBacekendData = async () => {  
        try{
        
          const response = await axios.post('http://localhost:3000/api/v1/paytm/user/signup/',{
            username: username,
            password: password,
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            email: email
        } ,{
          headers:{
            'Content-Type': 'application/json'
          }
        });
        console.log(response.data)
        setMessage(response.data.message);
        notify()
        navigate('/signin')
        }catch(error){
          console.log('Error sending data to backend :', error)
        }
         
    };


  return (
    <div className='bg-slate-300 h-screen flex justify-center'>
        <div className='flex flex-col justify-center'>
            <div className='rounded-lg bg-white w-80 text-center p-2 h-max px-4'>
                <Heading label='Signup'/>
                <SubHeading label='Enter your details below to create an account'/>
                <InputBox onChange={e=>{setUsername(e.target.value)}} label='Username' placeholder='_saurya_21s' required/>
                <InputBox onChange={e=>{setPassword(e.target.value)}} label='Password' placeholder='123456' required/>
                <InputBox onChange={e=>{setFirstName(e.target.value)}} label='FirstName' placeholder='Saurabh' required/>
                <InputBox onChange={e=>{setLastName(e.target.value)}} label='LastName' placeholder='Verma' required/>
                <InputBox onChange={e=>{setPhoneNumber(e.target.value)}} label='PhoneNumber' placeholder='1234567890' required/>
                <InputBox onChange={e=>{setEmail(e.target.value)}} label='Email' placeholder='saurabh123@gmail.com' required/>
                <div className='pt-4'>
                    <Button onClick={
                      sendBacekendData
                    } label="SignUp" />
                    <ToastContainer />
                </div>
                <BottomWarning label={"Already have a account? "} buttonText='Signin' to="/signin" />
            </div>

        </div>
        <Outlet />
    </div>
  )
}

export default Signup