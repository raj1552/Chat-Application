import {io} from 'socket.io-client'

const socket = new io ("https://d6b9-2400-1a00-b012-38-f235-fb19-b9dd-312b.ngrok-free.app", {
    autoConnect: "false",
    withCredentials: "true"
})

export default socket