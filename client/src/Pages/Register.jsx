import Navbar from "../components/Navbar.jsx";
import Form from "../components/RegisterForm.jsx";
const Register = () => {
  const path = '/login'
  const signin = 'Sign in' 
  return (
    <>
      <Navbar path={path} sign= {signin}/>
      <Form />
    </>
  );
};

export default Register;
