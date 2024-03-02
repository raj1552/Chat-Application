import { useEffect } from "react"
import socket from "../socket"

const usesocketsetup = () =>{
    useEffect(() =>{
        socket.connect();
    } ,[])
} 

export default usesocketsetup;