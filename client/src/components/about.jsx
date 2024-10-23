import React from 'react';
import './about.css';
const About=()=>{
    return(
        <div className="abt">
            <div className="hd">About the Developer</div>
            <div className="dl">
                <p style={{paddingLeft:'6%', paddingRight:'6%'}}>
                    Hi!, This is <span style={{color:'brown'}}>Rituraj Pal</span> and I am a <span style={{color:'brown'}}>Full Stack Web Developer</span> and I have developed this 
                    website as a part of my project.<br/>  
                    This website is developed using <span style={{color:'brown'}}>MERN Stack</span> and I have used <span style={{color:'brown'}}>Redux</span> for state management.
                    It solves a very common problem of finding <span style={{color:'brown'}}>labours</span> and <span style={{color:'brown'}}>Servicemen</span> in your area and locality. 
                </p>
                </div>
                
          
        </div>
    )
}
export default About;