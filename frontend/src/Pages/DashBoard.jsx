import React, { useEffect, useState } from 'react'
import AppBar from '../Components/AppBar'
import Balance from '../Components/Balance'
import Users from '../Components/Users'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const DashBoard = () => {

  const navigate = useNavigate();
  const [ amount,setAmount]=useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect to login page if token is not found
      navigate('/signin');
      return;
    }
    
    const fetchAmount = async () => {
      try {
     
        const response = await axios.get("http://localhost:3000/api/v1/paytm/account/balance", {
          headers: {
            "Content-Type": "application/json",
            'Authorization':`Bearer ${localStorage.getItem('token')}`
          },
        
        });
       
        setAmount(response.data.amount); // Assuming response.data contains an 'amount' field
      } catch (err) {
        console.log(`Error fetching amount: ${err.response ? err.response.data : err.message}`);
        
      
      }
    };

    fetchAmount();
  }, [navigate]);

  return (
    <div>
      <AppBar />
      {/* <div className="m-8">
        <Balance value={bal} />
        <Users />
      </div> */}
      <div className="m-8">
          
          <Balance value={amount}/>
          <Users/>
        
      </div>
    
    </div>
  )
}

export default DashBoard