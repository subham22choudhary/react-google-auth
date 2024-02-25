import logo from './logo.svg';
import './App.css';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

import Cookies from 'js-cookie';

function App() {
  const handleLoginSuccess = (credentialResponse) => {
    const credentialResponseDecoded = jwtDecode(credentialResponse.credential);
    console.log(credentialResponseDecoded);

    // Store the decoded data in a cookie
    Cookies.set('userCredentials', JSON.stringify(credentialResponseDecoded), { expires: 7 });
  };

  const handleLoginError = () => {
    console.log('Login Failed');
  };

  return (
    <div className="App">
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginError}
      />
    </div>
  );
}

export default App;