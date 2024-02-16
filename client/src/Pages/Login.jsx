import LoginForm from "../components/LoginForm";
import Navbar from "../components/Navbar";

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