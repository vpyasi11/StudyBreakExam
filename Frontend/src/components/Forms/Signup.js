import React, { useEffect, useRef, useState } from "react";
import "./css/Signup.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { URL } from "../../connection";

export default function Signup() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    const response = await axios.post(`${URL}/auth/v1/register`, {
      mail,
      password,
    });
    // console.log(response.data);
  };

  function handleMail(e) {
    setMail(e.target.value);
    // console.log(mail);
  }

  return (
    // <div className='body'>
    //   <h2>SIGN UP</h2>
    //     <div className='box'>

    //         <h6>Email<input id="email" onChange={handleMail} type="text" placeholder='abc@gmail.com'/></h6>

    //         <h6>Password<input id="password" type="password" placeholder='123456'/></h6>

    //         <h6>Username<input id="username" type="text" placeholder='type username'/></h6>

    //         <h6>Role<input id="role" type="text" placeholder='admin/examiner/student'/></h6>
    //         <br/>

    //         <button id='btn' onClick={register}>SIGN UP</button><br/>
    //         <p>Alreay a User ? <Link to='/Login'>LOGIN</Link></p>
    //     </div>
    // </div>

    <div class="box-form">
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

      <div class="right">
        <h5>Sign Up</h5>
        <p>
          Already have an account? <Link to="/Login">Login</Link>, it takes less
          than a minute
        </p>
        <div class="inputs">
          <input type="text" placeholder="Username" />
          <br />
          <input type="email" placeholder="Email" />
          <br />
          <input type="password" placeholder="Password" />
          <input type="textu" placeholder="Role" />
        </div>

        <br />
        <br />

        <div class="remember-me--forget-password">
          <label className="label">
            <input type="checkbox" name="item" checked />
            <span class="text-checkbox">Remember me</span>
          </label>
        </div>

        <br />
        <button>Sign Up</button>
      </div>
    </div>
  );
}
