"use client"
import { useEffect, useRef, useState } from "react";
import Avatar from "./ui/Avatar";
import { getsocket } from "@/socket";
import { Socket } from "socket.io-client";
import toast from "react-hot-toast";
import { useRouter, useParams } from "next/navigation";
import { memo } from "react";

const ConnectedUser = () => {

    const router = useRouter();
    // const params = useParams();
    // console.log(params)
    const {roomId} = useParams();
    const socket = getsocket();
    const [ connectedUser, setConnectedUser ] = useState<any>([])


    console.log("outside useeffect")

    useEffect(() => {
        console.log("inside mounted")

            function handleError(e: Error){
                console.log("socker error", e);
                toast.error("Socker connection failed, try again later");
                router.push("/joinroom")
            }

            socket.on('connect_error', (err) => handleError(err));
            socket.on('connect_failed', (err) => handleError(err));
            
            socket.emit("join", {
                roomId,
                userName: sessionStorage.getItem("userName")
            })

            //listen event
            socket.on("joined", ({clients, userName, socketId}) => {
                if(userName !== sessionStorage.getItem('userName')) {
                    toast.success(`${userName} joined the room`)
                }
                if (userName === sessionStorage.getItem('userName')){
                    toast.success("You joined room successfully")
                }
                setConnectedUser(clients)
                console.log(clients)
            })

            //listning for disconnected
            socket.on("disconnected",({socketId, userName}) => {
                    toast.success(`${userName} left the room`)
                    //filters and remove the disconnected user form the state
                    setConnectedUser((prev:any ) => {
                        return prev.filter((client: any) => client.socketId !== socketId
                    )
                    })
            })

        //cleanup funciton

        return () => {
                socket.off("connect_error");
                socket.off("connect_failed");
                socket.off("joined")
                socket.disconnect();
        }

    },[socket, roomId, router])


    return <div className="grid grid-cols-3 gap-y-5">
        {
            connectedUser.map((user:any) => {
                return <Avatar key={user.socketId} name={user.userName} />
            })
        }
        
    </div>
}
export default ConnectedUser;