import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import "./Signup.css"
import { backendUrl } from '../App';
import { NavLink } from 'react-router-dom';


const Signup = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name:"",email:"",password:""
  })
  let name, value;
  const handleInputs = (e) => {
    
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  }
  const [Signup,setSignup]=useState(false);
  const postData = async (e) => {
    setSignup(true);
    e.preventDefault();
    const { name, email, password} = user;
    const res = await fetch(`${backendUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name, email, password
      })


    });
    const data = await res.json();
    if (data.status === 422 || !data) {
      window.alert("Invalid Registration");
      console.log("Invalid Registration");
      setSignup(false);
    }
    else {
     toast.success("Registration Successfull trtrdeesd");
      console.log("Registration Successfull");
      navigate('/login');
    }


  }


  return (
    <>
      <section className='signup'>
        <div className='container mt-5'>
          <div className='signup-content'>
            <div className='signup-form'>
              <h2 className='form-title'>
                Sign Up
              </h2>
              <form method="POST" className='register-form' id='register-form'>
                <div className='form-group'>
                  <label htmlFor='name'>
                   <i class="zmdi zmdi-account"></i>

                  </label>
                  <input type='text' name='name' id='name' autoComplete='off'
                    value={user.name}
                    onChange={handleInputs}
                    placeholder='Your Name'
                  ></input>

                </div>

                <div className='form-group'>
                  <label htmlFor='email'>
                   <i class="zmdi zmdi-email"></i>

                  </label>
                  <input type='email' name='email' id='email' autoComplete='off'
                    value={user.email}
                    onChange={handleInputs}
                    placeholder='Your email'
                  ></input>

                </div>


               

                <div className='form-group'>
                  <label htmlFor='Password'>
                   <i class="zmdi zmdi-lock"></i>

                  </label>
                  <input type='password' name='password' id='password' autoComplete='off'
                    value={user.password}
                    onChange={handleInputs} //event handler
                    placeholder='Your password'
                  ></input>

                </div>
                 
                <div className='form-group form-button'>
                  <input type="submit" name="signup" id="signup" className='form-submit' value={Signup==true?"Registering..":"Register"} onClick={postData} disabled={Signup}>
                    
                  </input>

                </div>
                <div className='alreaadyRegistered'>
                  <div>Already Registered?
                     </div>
                     <NavLink to="/login" style={{marginLeft:"5px", color:"white"}}>Login here</NavLink>
                </div>
              </form>
             </div>
          </div>

        </div>

      </section>
    </>
  )
}

export default Signup
