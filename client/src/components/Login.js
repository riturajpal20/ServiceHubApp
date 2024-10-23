import React from 'react'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import "./Login.css"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../redux/store';
import toast from 'react-hot-toast';
import { backendUrl } from '../App';
const Login = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();
   const [user, setUser] = useState({
    email:"",password:""
  })
  let name, value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  }
    const [Signin,setSignin]=useState(false);
  const checkSign = async (e) => {
    setSignin(true);
    e.preventDefault();
    const { email, password} = user;
    const res = await fetch(`${backendUrl}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email, password
      })


    });
    if (!res.ok) {
      window.alert("Invalid Login check Email or Password");
      console.error("Invalid Login");
      setSignin(false);
      return;
    }
    const data=await res.json();
    if(data.status===422||data.status===402||!data){
      window.alert("Invalid Login ");
      console.log("Invalid Login");
      setSignin(false);
    }
    else{
      localStorage.setItem("userId",data?.user._id);
      localStorage.setItem("name",data?.user.name);
      dispatch(authActions.login());
      toast.success("Successful Login");
      console.log("successful Login");
      navigate("/services" );
    }

  }

  return (

    <>
      <section className='sign-in'>
        <div className='container mt-5'>
          <div className='signin-content'>
            {/* <div className='signin-image'>
                <NavLink to="/signup" className="signup-image-link"> Create An Account</NavLink>
            </div> */}
            <div className='signin-form'>
              <h2 className='form-title'>
                Signin
              </h2>
              <form method="POST" className='register-form' id='register-form'>
                
                <div className='form-group'>
                  <label htmlFor='email'>
                   <i class="zmdi zmdi-email"></i>

                  </label>
                  <input type='email' name='email' id='email' autoComplete='email'
                    value={user.email}
                    onChange={handleInputs}
                    placeholder='Your email'
                  ></input>

                </div>


               

                <div className='form-group'>
                  <label htmlFor='Password'>
                   <i class="zmdi zmdi-lock"></i>

                  </label>
                  <input type='password' name='password' id='password' autoComplete='current-password'
                    value={user.password}
                    onChange={handleInputs}
                    placeholder='Your password'
                  ></input>

                </div>
                 
                <div className='form-group form-button'>
                  <input type="submit" name="signin" id="signin" className='form-submit' value={Signin==true?"working...":"signin"}onClick={checkSign} disabled={Signin}>
                    
                  </input>

                </div>
                <div className='alreaadyRegistered'>
                  <div>Not Registered? </div>
                  <NavLink to="/signup" style={{marginLeft:"5px", color:"white"}}>Register here</NavLink>
                </div>
               
              </form>
             </div>
          </div>

        </div>

      </section>
          

    </>
  )
}

export default Login;
// import React from 'react'

// const Login = () => {
//   return (
//     <div>
//       <h1>login</h1>
      
//     </div>
//   )
// }

// export default Login

