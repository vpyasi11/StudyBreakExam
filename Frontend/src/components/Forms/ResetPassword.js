import React from "react";
import { Link } from "react-router-dom";
import "./css/ResetPassword.css";

export default function ResetPassword() {
  return (
    <>
      {/* <div className='body'>
            <h2>Reset Password</h2>
                <div className='box'>
                    
                    <h6>Email<input id="email" type="text" placeholder='abc@gmail.com' /></h6>
                    
                    <h6>New Password<input type="password" placeholder='Type a new password' /></h6>
                    <br />
                    <button id='btn'>Reset Password</button><br/>
                    <Link to="/login">Go Back</Link>
                </div>
            </div> */}

      <div class="box-form-reset">
        <div class="right">
          <h5>Reset Password</h5>
          <p>
            Wish to Try again ? <Link to="/login">Go Back</Link>
          </p>
          <div class="inputs">
            <input type="text" placeholder="Email" />
            <br />
            <input type="password" placeholder="New Password" />
            <br />
            <input type="password" placeholder="Confirm Password" />
          </div>

          <br />
          <br />

          <button>Confirm</button>
        </div>
      </div>
    </>
  );
}
