import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';
import './login.css';

function Login() {
  const handleLoginSuccess = (credentialResponse) => {
    const credentialResponseDecoded = jwtDecode(credentialResponse.credential);
    console.log(credentialResponseDecoded);

    Cookies.set('userCredentials', JSON.stringify(credentialResponseDecoded), { expires: 1/2880 });
  };

  const handleLoginError = () => {
    console.log('Login Failed');
  };

  const validateForm = () => {
    let x = document.getElementById("firstName").value;
    let y = document.getElementById("secondName").value;
    let z = document.getElementById("errorText");
    let c = document.getElementById("emailField").value;

    localStorage.setItem('firstName', x);
    localStorage.setItem('secondName', y);
    localStorage.setItem('emailField', c);

    let emailRegex = /^[a-zA-Z0-9._%+-]+@(?!gmail\.com|bubble\.com)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (x === "" && y === "" || !c.match(emailRegex)) {
      z.style.display = "block";
      return false;
    } else {
      document.getElementById("formData").style.display = "none";
      document.getElementById("submitDiv").style.display = "block";
      return false;
    }
  };

  return (
    <div className="">
      <div className='main-bg'>

        <div>
          <form onSubmit={validateForm} id="formData">
            <input className='forminputfield' type="text" name="fname" id="firstName" placeholder="First Name" /><br /><br />
            <input className='forminputfield' type="text" name="lname" id="secondName" placeholder="Last Name" /><br /><br />
            <input className='forminputfield' type="text" name="ename" id="emailField" placeholder="Email" /><br /><br />

            <div className='butn'>
              <input type="submit" value="Submit" />
            </div>
            <p style={{ display: 'none' }} id="errorText">Please fill the required fields*</p>
          </form>

          <div id="submitDiv" style={{ display: 'none' }}>
            <h4>Thank you!</h4>
          </div>
        </div>

        <div>
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginError}
          />
        </div>


      </div>
    </div>
  );
}

export default Login;
