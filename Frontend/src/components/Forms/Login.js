import React from "react";
import { Link } from "react-router-dom";
import "./css/Login.css";

export default function Login() {
  return (
    // <div className='body'>
    //   <h2>LOGIN</h2>
    //   <div className='box'>

    //     <h6>Email<input id="email" type="text" placeholder='abc@gmail.com' /></h6>

    //     <h6>Password<input type="password" placeholder='123456' /><br /></h6>

    //     <input type='checkbox'/> Remember me ? <br/>
    //     <button id='btn'>LOGIN</button><br />
    //     <h6><Link to='/resetPassword'>Forgot Password?</Link></h6>

    //     <p>Need an account? <Link to='/signup'>SIGN UP</Link></p>
    //   </div>
    // </div>

    <div class="box-form">
      <div class="right">
        <h5>Login</h5>
        <p>
          Don't have an account? <Link to="/signup">Creat Your Account</Link>,
          it takes less than a minute
        </p>
        <div class="inputs">
          <input type="text" placeholder="Username" />
          <br />
          <input type="password" placeholder="Password" />
        </div>

        <br />
        <br />

        <div class="remember-me--forget-password">
          <label className="label">
            <input type="checkbox" name="item" checked />
            <span class="text-checkbox">Remember me</span>
          </label>
          <Link to="/resetPassword">Forgot Password?</Link>
        </div>

        <br />
        <button>Login</button>
      </div>
      <div class="left">
        <div class="overlay">
          <h1>Study BreakExam</h1>
          <p>
            Are you a quiz whiz? Test your knowledge with our fun and
            challenging quiz! From the highest peaks to the deepest oceans,
            we’ll take you on a journey around the world. Think you have what it
            takes? Take the quiz now and find out!{" "}
          </p>
          <span>
            <p>login with social media</p>
            <a href="#">
              <i class="fa fa-facebook" aria-hidden="true"></i>
            </a>
            <a href="#">
              <i class="fa fa-twitter" aria-hidden="true"></i>{" "}
            </a>
            <a href="#">
              <i class="fa fa-google" aria-hidden="true"></i>{" "}
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
