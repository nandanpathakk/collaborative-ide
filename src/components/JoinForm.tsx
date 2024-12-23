'use client'
import { useState } from "react";
import { v4 as uuidV4 } from "uuid";
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from "next/navigation";
import Button from "./ui/Button";

const JoinForm = () => {

    const router = useRouter();

    const [RoomId, setRoomId] = useState<string>("");
    const [userName, setUserName] = useState<string>("")


    const createNewRoom = () => {
        const newRoomId = uuidV4();
        // console.log(newRoomId);
        setRoomId(newRoomId) 
        toast.success("New Room Created")
    }

    const JoinRoom = () => {
        if (!RoomId || !userName) {
            toast.error("Rood Id and Username required")
            return
        }
        sessionStorage.setItem("userName", userName)
        router.push(`/editor/${RoomId}`)
    }

    const EnterRoom = (e: React.KeyboardEvent<HTMLInputElement>) => {  // enter room on pressing Enter key
        if (e.code === "Enter") {
            console.log(typeof(e))
            JoinRoom()
        }
    }

    return <div className="z-20 bg-[#212121] px-5 py-5 rounded-xl w-[90%] max-w-md">

        {/* Header */}
        <div className="pb-3 font-bold text-[#FFFFFF] flex justify-between items-center">
            <span>CodeSpace</span>
            <span>Logo</span>
        </div>

        {/* Form */}
        <div>
            <label htmlFor="roomCode" className="text-white mb-2 block">
                Enter your room code
            </label>
            <div className="flex flex-col space-y-3">
                <input
                    id="roomCode"
                    name="roomCode"
                    className="p-2 rounded-md"
                    type="text"
                    placeholder="Room Code"
                    aria-label="Room Code"
                    value={RoomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    onKeyUp={EnterRoom}
                />
                <input
                    id="username"
                    name="username"
                    className="p-2 rounded-md"
                    type="text"
                    placeholder="Username"
                    aria-label="Username"
                    onChange={(e) => setUserName(e.target.value)}
                    onKeyUp={EnterRoom}
                />
            </div>

            <div className="mt-4 flex items-center justify-center">
                <div className="w-1/3">
                <Button
                    type="button"
                    onClick={JoinRoom}
                >
                    Join
                </Button>
                </div>
            </div>

            <p 
            onClick={createNewRoom}
            className="text-white mt-3 text-center text-sm">
                Don&apos;t have a room?{' '}
                <span
                    className="text-[#99a1a8] cursor-pointer hover:underline"
                >
                    Create a new room
                </span>
            </p>
        </div>
    </div>

}
export default JoinForm