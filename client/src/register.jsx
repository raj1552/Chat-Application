import { useEffect, useState } from 'react';

const Register = () => {
  return (
    <div>
      <h1>Create an account</h1>
      <input type='email'placeholder='Email'/>
      <input type='text' placeholder='Username'/>
      <input type='password' placeholder='Password'/>
      <input type='tel' placeholder = 'Phone Number (optional)'/>
    </div>
  );
};

export default Register;
