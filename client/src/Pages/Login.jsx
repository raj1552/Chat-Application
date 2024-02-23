import LoginForm from "../components/authcomponents/LoginForm.jsx";
import Navbar from "../components/authcomponents/Navbar.jsx";

const Login = () => {
    const path = '/register'
    const signup = 'Sign up'
    return ( 
        <>
        <Navbar path ={path} sign = {signup}/>
        <LoginForm/>
        </>
     );
}
 
export default Login;