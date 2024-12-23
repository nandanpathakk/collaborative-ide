"use client";
import { useEffect, useState } from "react";
import Avatar from "./ui/Avatar";
import { getsocket } from "@/socket";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";

const ConnectedUser = () => {
  const { roomId } = useParams();
  const socket = getsocket();
  const [connectedUsers, setConnectedUsers] = useState<any[]>([]);

  useEffect(() => {
    const userName = sessionStorage.getItem("userName");

    if (!userName) {
      toast.error("Username not found in session. Please join again.");
      return;
    }

    // Emit the join event to the server
    socket.emit("join", { roomId, userName });

    // Listen for the `joined` event and update the state
    socket.on("joined", ({ clients, userName: joinedUserName }) => {
      setConnectedUsers(clients);

      if (joinedUserName !== userName) {
        toast.success(`${joinedUserName} joined the room.`);
      } else {
        toast.success("You successfully joined the room.");
      }
    });

    // Listen for the `disconnected` event and update the state
    socket.on("disconnected", ({ socketId, userName: leftUserName }) => {
      setConnectedUsers((prev) =>
        prev.filter((client) => client.socketId !== socketId)
      );
      toast.success(`${leftUserName} left the room.`);
    });

    // Cleanup listeners on unmount
    return () => {
      socket.off("joined");
      socket.off("disconnected");
    };
  }, [socket, roomId]);

  return (
    <div className="grid grid-cols-3 gap-y-5">
      {connectedUsers.map((user) => (
        <Avatar key={user.socketId} name={user.userName} />
      ))}
    </div>
  );
};

export default ConnectedUser;
