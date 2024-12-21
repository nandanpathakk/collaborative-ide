import React from "react";

interface avatarProp {
    name: string
}

const Avatar: React.FC<avatarProp> = ({name}) => {

    const capitalizeFirstLetter = (name: string): string => {
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    }

    const clipedChar = name.toUpperCase().charAt(0)

return (
    <div>
        <div className="flex flex-col items-start"> 
            <div className="flex flex-col items-center">
                 <div>
                <div className="w-10 h-10 bg-pink-400 rounded-full flex items-center justify-center ">
                    <p>{clipedChar}</p>
                </div>
            </div>
            <p>{capitalizeFirstLetter(name)}</p>
            </div>
        </div>
            </div>
)}
export default Avatar;