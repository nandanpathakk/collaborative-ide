import {io, Socket} from "socket.io-client";

let socket: Socket | null = null;

export const getsocket = (): Socket =>{
  // Only create the socket if it doesn’t already exist
  if (!socket) {          
    socket = io(process.env.NEXT_PUBLIC_BACKEND_URL, { transports: ["websocket"] })
  }
  return socket;
}



  // // "undefined" means the URL will be computed from the `window.location` object
  
  // export const socket = async () => {
  //   const options = {
  //         'force new connection': true,
  //         reconnectionAttempts: Infinity, 
  //         timeout: 10000, 
  //         transports: ['websocket'], 
  //     };
  
  //     return io(process.env.NEXT_PUBLIC_BACKEND_URL, options)
  // }
  