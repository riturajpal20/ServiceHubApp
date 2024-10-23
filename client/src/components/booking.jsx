import React from 'react'
import {useState,useEffect} from "react";
import { Link,useLocation,useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import axios from 'axios';
import "./booking.css";
import { backendUrl } from '../App';
export const Booking = (props) => {
    const location=useLocation();
    const data=location.state?.data1;
    const id = location.state?.data1?._id;
    // console.log(id);
    const fullName=data? `${data.fname} ${data.lname}`:"";
    const city=data?.city;
    const serviceName=data?.service;
    const navigate=useNavigate();
    const [user, setUser] = useState({
      email:"",phone:"",pincode:"",address:""
    })
    let name, value;
    const handleInputs = (e) => {
      console.log(e);
      name = e.target.name;
      value = e.target.value;
      setUser({ ...user, [name]: value });
    }
    async function handleBookNow(e) {
      e.preventDefault();
      console.log('handleBookNow function calling');
      if(!user.email || !user.phone || !user.pincode || !user.address){
        toast.error("Please fill all the fields to complete booking");
        return;
      }
      try{
        const id1=id;
        console.log("hi id");
        const response = await axios.put(`${backendUrl}/api/update/${id1}`, { isbooked: true });
      if (response.data.success) {
        console.log("booked done")
        toast.success("Successful booking");
        return navigate('/bookingcomplete' ,{state:{data1:data,user}});
        
      } else {
        toast.success("well not");
        navigate('/services');
        console.log("not done properly");
        console.error('Error updating booking status', response.status);
        console.log('Navigating to /login'); 
      }
      }
      catch(err){
        navigate('/services');
        toast.error("error in booking try again");
        console.log(err);
      }
    }
  return (
    <div className='form1'>
      <div className="details">
      <h1>Booking Details</h1>
      <div className="details12">
        <div className="name">
          <h3>Name:</h3>
         {fullName?<h3 style={{color:'brown', paddingLeft:'10px'}}>{fullName}</h3>:
         <h3 style={{color:'grey', paddingLeft:'10px'}}>No Name</h3>}
        </div>
        <div className="city">
          <h3>City:</h3>
          {city?<h3 style={{color:'brown', paddingLeft:'10px'}}>{city}</h3>
          :<h3 style={{color:'grey', paddingLeft:'10px'}}>No City</h3>}
        </div>
        <div className="service">
          <h3>Service:</h3>
          {serviceName?<h3 style={{color:'brown', paddingLeft:'10px'}}>{serviceName}</h3>:
          <h3 style={{color:'grey', paddingLeft:'10px'}}>No Service</h3>  }
        </div>  
      </div>
      </div>
    <div className='form-main'> 
   <form>
    <label>
      Address:
      <input type="text" name="address"  value={user.address} onChange={handleInputs}/>
    </label>
    <label>
      Pincode:
      <input type="text" name="pincode" value={user.pincode} onChange={handleInputs}  />
    </label>
    <label>
      Email:
      <input type="email" name="email" value={user.email} onChange={handleInputs} />
    </label>
    <label>
      Phone:
      <input type="tel" name="phone" value={user.phone}  onChange={handleInputs}/>
    </label>
  
    <input type="submit" onClick={handleBookNow} value="Submit" />
  </form>
  </div>
  </div>
  )
}
