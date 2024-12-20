"use client"
import { useState } from "react";
import Avatar from "./ui/Avatar";

const ConnectedUser = () => {

    const [ connectedUser, setConnectedUser ] = useState([
        { sockerid: 1, name: "Nandan"},
        { sockerid: 2, name: "Radha" },
        { sockerid: 3, name: "Krishna" },
        { sockerid: 4, name: "ram" },
        { sockerid: 5, name: "balram" },
    ])

    return <div className="grid grid-cols-3 gap-y-5">
        {
            connectedUser.map((user) => {
                return <Avatar key={user.sockerid} name={user.name} />
            })
        }
        
    </div>
}
export default ConnectedUser;