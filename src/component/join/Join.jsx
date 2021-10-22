import React, { useState } from 'react';
import './join.css';
import logo from  '../../image/robot.png';
import {Link} from 'react-router-dom';





let user;
const sendUser = () => {
user = document.getElementById('joininput').value;
document.getElementById('joininput').value="";
}

const Join = () => {
    const [name, setName] = useState("");
    console.log(name);
    return (
        <>
        <div className="joinpage">
        <div className="joincontainer">
        <img src={logo} alt="" />
        <h1>CHAT ROOM </h1>
        <input onChange={(e)=>setName(e.target.value)} type="text" id="joininput" placeholder="Enter your Name" />
        <Link onClick={(event)=>!name ? event.preventDefault():null} to ="/chat"> <button onClick={sendUser} className="joinbtn">Login</button></Link>
        </div>
            
        </div>
        </>
    )
}

export default Join
export {user}
