import React, { useEffect, useState } from 'react';
import {user} from '../join/Join';
import socketIO from 'socket.io-client';
import './chat.css';
import send from '../../image/send-mail.png';
import Message from '../message/Message';
import ReactScrollToBottom from 'react-scroll-to-bottom';
import icon from '../../image/close.png';

let socket;
 const ENDPOINT = 'https://cchat-room.herokuapp.com/';




const Chat = () => {
    const [id, setid] = useState("");
    const [messages, setMessages] = useState([])
   const senda=()=>{
       const message = document.getElementById('inputchat').value;
       socket.emit('message',{message,id})
       document.getElementById('inputchat').value="";
       
   }
   
    useEffect(() => {
         socket = socketIO(ENDPOINT,{transports:['websocket']});
        socket.on("connect",()=>{
            // alert('connected');
            setid(socket.id);
        })
        console.log(socket);
        socket.emit('joined',{user})

        socket.on('welcome',(data)=>{
            setMessages([...messages,data]);
            console.log(data.user,data.message);
        })

        socket.on('userJoined',(data)=>{
            setMessages([...messages,data]);
            console.log(data.user,data.message);
        })
        socket.on('leave', (data) => {
            setMessages([...messages, data]);
            console.log(data.user, data.message)
        })

        return()=>{
            socket.emit('disconnect');
            socket.off();
        }
    }, [])

    useEffect(() => {
        socket.on('sendMessage',(data)=>{
            setMessages([...messages,data]);
console.log(data.user,data.message,data.id);
        })
        return () => {
            socket.off();
        }
    }, [messages])
    return (
        <>
        <div className="chatpage">
         <div className="chatcontainer">
             <div className="header">
                <h2>CHAT ROOM</h2>
                <a href="/"><img src={icon} alt="" /></a>
                
             </div>
             <ReactScrollToBottom className="chatbox">
             {messages.map((item,i)=>{
                 return  <Message user={item.id===id?'':item.user}  message={item.message} classs={item.id===id?'right':'left'}/>
             })}
                 
             </ReactScrollToBottom>
             <div className="chatinput">
                 <input onKeyPress={(event)=>event.key==="Enter"?senda():null} type="text" id="inputchat" />
                 <button onClick={senda} className="sendbtn"><img src={send} alt="" /></button>
             </div>
         </div>
        </div>
        </>
    )
}

export default Chat
