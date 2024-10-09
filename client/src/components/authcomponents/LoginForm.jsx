import { useState } from "react";
import axios from "axios";
import { useCookies } from 'react-cookie';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import "../../css/Login.css";
import { json, useNavigate } from 'react-router-dom';



const LoginForm = () => {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [cookies, setCookie] = useCookies(['token']);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const validateIdentifier = (identifier) => {
    const regex = /^(?:\w+|\w+([+\.-]?\w+)*@\w+([\.-]?\w+)*(\.[a-zA-z]{2,4})+)$/
    return regex.test(identifier)
  }

  const resetForm = () =>{
    setFormData({
      identifier: "",
      password: ""
    });
    setUserName("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!validateIdentifier(formData.identifier)){
      return setError("Invalid Username and Email")
    }

    try {
      const response = await axios.post(
        "https://d6b9-2400-1a00-b012-38-f235-fb19-b9dd-312b.ngrok-free.app/user/login",
        formData
      );

      if (!response.data.sucess) {
        resetForm();
        return setError("Invalid Email and Password");
      }
      console.log(response.data)
      setCookie('token', response.data.body.token);
      localStorage.setItem('user', JSON.stringify(response.data.body.user));
      navigate('/chat')
    } catch (error) {
      setError("Please try again.");
    }
  };

  const signinGoogle = async (e) =>{
    e.preventDefault()
    try{
      const response = await axios.get('http://localhost:5000/auth/google')
      console.log(response)
    }
    catch(error){
      console.error('Error signing in with Google:', error);
    }
  }
  return (
    <div className="container">
      <div className="elements">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            className="email"
            type="text"
            name="identifier"
            placeholder="Username or Email"
            value={formData.identifier}
            onChange={handleChange}
            required
          />
          <input
            className="password"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <a href="/forgetpassword">Forgot Password?</a>
          {error && <p className="error">{error}</p>}
          <button className="btn" type="submit">
            Sign in
          </button>
        </form>
        <p className="or">Or</p>
        <button onClick={signinGoogle} className="google">
          <FontAwesomeIcon icon={faGoogle} />
          Sign in with Google
        </button>
        <div className="account">
          <a href="/register">Don't have an account?</a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
