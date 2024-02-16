import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import "../css/Login.css";

const LoginForm = () => {
  const signup = 'Signup' 
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/user/login",
        formData
      );
      localStorage.setItem("token", response.data.body.token);
      console.log("Sucessfully login");
    } catch (error) {
      setError("Please try again.");
    }
  };

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
          <a href="">Forgot Password?</a>
          {error && <p className="error">{error}</p>}
          <button className="btn" type="submit">
            Sign in
          </button>
        </form>
        <p className="or">Or</p>
        <button className="google">
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
