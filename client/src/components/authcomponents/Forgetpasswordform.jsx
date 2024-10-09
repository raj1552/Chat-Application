import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgetpasswordForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
  });

  const [error, setError] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const validateEmail = (email) =>{
    let emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    return emailRegex.test(email)
  }

  const handleOtp = async (e) => {
    e.preventDefault();
    
    if(!validateEmail(formData.email)){
      return setError("Inavlid Email")
    }
    try {
      const response = await axios.post(
        "https://d6b9-2400-1a00-b012-38-f235-fb19-b9dd-312b.ngrok-free.app/user/forgetpassword",
        formData
      );
      navigate("/resetpassword");
    } catch (error) {
      setError("Email doesn't Exist")
    }
  };
  return (
    <div className="container">
      <div className="elements">
        <h1>Send Otp Verification</h1>
        <form onSubmit={handleOtp}>
          <input
            type="email"
            className="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {error && <p className="error">{error}</p>}
          <button className="btn" type="submit">
            Send otp
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetpasswordForm;
