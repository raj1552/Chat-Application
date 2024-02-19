import axios from "axios";
import { useState } from "react";
import { Form, useNavigate } from "react-router-dom";

const Resetpasswordform = () => {
  const navigate = useNavigate();
  const [FormData, setFormData] = useState({
    otp: "",
    password: "",
    confirmpassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const resetpassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/user/resetpassword",
        FormData
      );
      console.log("Reset Password sucessfully");
      navigate("/login");
    } catch (error) {
      setError("Otp isn't valid")
    }
  };
  return (
    <div className="container">
      <div className="elements">
        <h1>Reset Password</h1>
        <form onSubmit={resetpassword}>
          <input
            type="number"
            name="otp"
            className="number"
            placeholder="Enter otp code"
            onChange={handleChange}
            value={FormData.otp}
            required
          />
          <input
            type="password"
            name="password"
            className="password"
            placeholder="Enter new password"
            onChange={handleChange}
            value={FormData.password}
            required
          />
          <input
            type="password"
            name="confirmpassword"
            className="password"
            placeholder="Enter your password again"
            value={FormData.confirmpassword}
            onChange={handleChange}
            required
          />
          {error && <p className="error">{error}</p>}
          <button className="btn" type="submit">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default Resetpasswordform;
