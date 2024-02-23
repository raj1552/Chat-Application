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

  const handleOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/user/forgetpassword",
        formData
      );
      console.log("otp sent Sucessfully!");
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
