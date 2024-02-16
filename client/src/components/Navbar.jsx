import '../css/navbar.css'
const Navbar = (props) => {
    return ( 
        <div className="navbar">
            <div className="navcontainer">
            <div className="navitems">
            <img src="/CHAT.io(1).png" alt="" />
            </div>
            <div className="signin-btn">
            <a href={props.path}><button>{props.sign}</button></a>
            </div>
            </div>
        </div>
     );
}
 
export default Navbar;