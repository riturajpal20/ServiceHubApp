import react from "react";
import { Link,useLocation,useNavigate } from "react-router-dom";
import "./bookingcomplete.css"; 
import { AiOutlineFileDone } from "react-icons/ai";
const BookingComplete = (props) => {
    const navigate=useNavigate();
    const location=useLocation();
    const data=location.state?.data1;
    const user=location.state?.user;
    const email=user?.email;
    const phone=user?.phone;
    const pincode=user?.pincode;
    const address=user?.address;
    const fullName=data? `${data.fname} ${data.lname}`:"";
    const city=data?.city;
    const serviceName=data?.service;
    console.log(data);
  return (
    <div className="bk">
        <div className="hd">Booking confirmed <AiOutlineFileDone style={{color:'green', marginTop:'14px',marginLeft:'14px'}}/></div>
        <div className="details13">
        <h1>Name of servicemen: {fullName}</h1> 
        <h1>City: {city}</h1> 
        <h1>Service: {serviceName}</h1> 
        <h1>Your Email: {email}</h1>
        <h1>Your Phone: {phone}</h1>
        <h1>Your Pincode: {pincode}</h1>
        <h1>Your Address: {address}</h1>
        </div>
        <div className="go">
            <button onClick={()=>navigate('/')}>Go to Home Page</button>
        </div>
    </div>
  );
};
export default BookingComplete;