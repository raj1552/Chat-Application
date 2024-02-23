import '../../css/Setting.css'

const UserSetting = () => {
    return ( 
        <div className="setting-container">
            <div className="setting-elements">
            <h1>Profile</h1>
            <h3>Name</h3>
            <button>Edit</button>
            <h2>Notifications</h2>
            <p>Mute Notification sounds</p>
            <label htmlFor="switch">
                <input type="checkbox"/>
                <span className='slider'></span>
            </label>
            <h2>Privacy</h2>
            <p>Blocked People</p>
            <p>Who can add e to groups</p>
            <p>Who can see your Last Seen, Profile Photo and About</p>
            <h2>Account</h2>
            <p>Change phone number</p>
            <p>Request account info</p>
            <p>Delete my account</p>
            <p>Log out</p>
            </div>
        </div>
     );
}
 
export default UserSetting;