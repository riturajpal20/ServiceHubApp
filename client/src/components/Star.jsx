import React from 'react'
import { FaStar,FaStarHalfAlt } from 'react-icons/fa';
import {AiOutlineStar} from 'react-icons/ai'
import './starstyle.css'
const Star = ({star}) => {
  const ratingStar=Array.from({length:5},(id,index)=>
  {
    let number=index+10;
    // console.log(number);
  return( 
  <span key={index}>
    
    {
      star>=index+1?(
      <FaStar className='icon'/>):star>=number?(
      <FaStarHalfAlt className='icon'/>):
      (<AiOutlineStar className='icon'/>)
    }
  </span>
  );
});
return (
  <>
    <div className="icon-style" >
    {ratingStar}
    </div>
  </>
)
}

export default Star;