import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import "./Navbar.css";
import {
  FaGithub ,
  FaLinkedin
} from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate=useNavigate(); 
  let isLogin=useSelector(state=>state.isLogin);
  isLogin=isLogin|| localStorage.getItem("userId");
  const userName=localStorage.getItem("name");  
  const dispatch=useDispatch();
  console.log(isLogin);
  const handleLogout=()=>{
   try{
    dispatch(authActions.logout());
    toast.success("Logout succesful");
    navigate("/login");
    localStorage.clear();
   }
    catch(err){
      console.log(err);
    } 

  };
  const [showMediaIcons, setShowMediaIcons] = useState(false);
  return (
    <>
      <nav className="main-nav">
        {/* 1st logo part  */}
        <div className="logo">
          <h2>
            <span style={{ fontFamily:"cursive"}}>S</span>ervice
            <span style={{fontFamily:"cursive"}}>H</span>ub
          </h2>
        </div>

        {/* 2nd menu part  */}
        <div
          className={
            showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"
          }>
          <ul >
          {isLogin ? (
    <>
     <li onClick={() => setShowMediaIcons(!showMediaIcons)}>
        <NavLink to="/">Home</NavLink>
      </li>
      <li onClick={() => setShowMediaIcons(!showMediaIcons)}>
        <NavLink to="/about">About</NavLink>
      </li>
    
      <li ><CgProfile id="prfic" /><span style={{fontWeight:"bolder", color:"#149485", fontFamily:"cursive"}}>{userName}</span></li>
      <li onClick={() => setShowMediaIcons(!showMediaIcons)}>
        <button id="logout" onClick={handleLogout}>Logout</button>
      </li>
    </>
  ) : (
    <>
      <li onClick={() => setShowMediaIcons(!showMediaIcons)}>
        <NavLink to="/">Home</NavLink>
      </li>
      <li onClick={() => setShowMediaIcons(!showMediaIcons)}>
        <NavLink to="/about">About</NavLink>
      </li>
      <li onClick={() => setShowMediaIcons(!showMediaIcons)}>
        <NavLink to="/login">Login</NavLink>
      </li>
      <li onClick={() => setShowMediaIcons(!showMediaIcons)}>
        <NavLink to="/signup">Signup</NavLink>
      </li>
    </>
  )}
          </ul>
        </div>

        {/* 3rd social media links */}
        <div className="social-media">
          <ul className="social-media-desktop">
            <li>
              <a
                href="https://www.linkedin.com/in/rituraj-pal-9176b1225/"
                target="Rituraj">
                <FaLinkedin className="linkedin" style={{height:'30px', width:'30px'}}/>
              </a>
            </li>
            <li>
              <a
                href="https://github.com/riturajpal20"
                target="github">
                <FaGithub className="github" style={{height:'30px', width:'30px'}} />
              </a>
            </li>
          </ul>
         <div className="hamburger-menu">
            <a href="#" onClick={() => setShowMediaIcons(!showMediaIcons)}>
              <GiHamburgerMenu />
            </a>
          </div>
        </div> 
      </nav>

      {/* hero section  */}
      
    </>
  );
};

export default Navbar;