import "../styles/Footer.scss"
import React, { useRef,useState } from 'react';

import emailjs from '@emailjs/browser';
import { LocationOn, LocalPhone, Email } from "@mui/icons-material"
const Footer = () => {

  const formRef=useRef();

    const[error,setError]=useState(false);
    const[success,setSuccess]=useState(false);

    const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs
          .sendForm('service_0nf66oa', 'template_pad6bgr', formRef.current, {
            publicKey: 'dF2O5K-F4KISOReqL',
          })
          .then(
            (result) => {
              setSuccess(true);
            },
            (error) => {
              setError(true);
            },
          );
      };

  return (
    <div className="footer">
      <div className="first">
        <a href="/" style={{textDecoration:"none"}}><h1> Thanks for choosing <span style={{color:"teal"}}>RENTIFY !</span></h1></a>
      </div>
      <hr />

      <div className="bottom">

        

      <div className="left">

      <div className="second">
        <h3 style={{textAlign:"center"}}>Useful Links</h3>
        <ul>
          <li>About Us</li>
          <li>Terms and Conditions</li>
          <li>Feedback</li>
        </ul>
      </div>
        <br />
      <div className="third">
        <h3 style={{textAlign:"center"}}>Contact</h3>
        <div className="cont">

        <div className="thirdinfo">
          <LocalPhone />
          <p>+91 94438 36278</p>
        </div>
        <div className="thirdinfo">
          <Email />
          <p>rentify@gmail.com</p>
        </div>
        </div>


      </div>

      <div class="footer-content" style={{textAlign:"center",marginTop:"20vh"}}>

        <p>&copy;2024 RENTIFY. All rights reserved.</p>
        <p>Designed by <b title="Click to see the portfolio" style={{cursor:"pointer"}}>Aravindh S</b>  </p>
      </div>


      </div>
      <div className="right">
        <h4 style={{textAlign:"center"}}>FEEDBACK</h4><br />
        <p style={{textAlign:"center",color:"teal"}}>Your feedback values the most. <br /> Tell us what we need to improve!</p>
        <div className="formContainer">
            
            <form ref={formRef} onSubmit={sendEmail}>
                <input type="text" required placeholder='Name' name='from_name'/>
                <input type="email" required placeholder='Email' name='email'/>
                <textarea name="message" id="" cols="8" rows={5} placeholder='Message'/>
                <button>Submit</button>
                {error && "Error"}
                {success && "Success"}
            </form>
        </div>
      </div>
    </div>

    </div>
  )
}

export default Footer