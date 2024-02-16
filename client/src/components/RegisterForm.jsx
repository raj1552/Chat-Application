import { useState } from 'react';
import '../css/register.css'
import axios from 'axios';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmpassword: '',
    phonenumber: '',
    terms: false,
    privacyPolicy: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      console.log("Iam in")
      const response = await axios.post('http://localhost:3000/user/register', formData)
      console.log(response)
    }
    catch(error){
      console.error(error)
    }
  };
  return (
    <div className="container">
      <div className="elements">
        <h1>Create a new account</h1>
        <form onSubmit={handleSubmit}>
          <input
            className="email"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            className="username"
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
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
            <input
            className="password"
            type="password"
            name="confirmpassword"
            placeholder="ConfirmPassword"
            value={formData.confirmpassword}
            onChange={handleChange}
            required
          />
          <input
            className="phonenumber"
            type="tel"
            name="phonenumber"
            placeholder="Phone Number (optional)"
            value={formData.phonenumber}
            onChange={handleChange}
          />
          <div className="agree-terms">
            <div className="policy">
              <input
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleCheckboxChange}
                required
              />
              <label htmlFor="terms">I agree to the terms of service</label>
            </div>
            <div className="policy">
              <input
                type="checkbox"
                name="privacyPolicy"
                checked={formData.privacyPolicy}
                onChange={handleCheckboxChange}
                required
              />
              <label htmlFor="privacyPolicy">
                I agree to the privacy policy
              </label>
            </div>
          </div>
          <button className="btn" type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
