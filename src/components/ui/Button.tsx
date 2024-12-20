import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    varient?: "primary" | "secondary"
    children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({varient="primary", children, ...props}) => {   // default varient is primary


    const VaritneClass = {
        primary: "bg-[#4CAF50] hover:bg-[#43A047] text-white",
        secondary: "bg-gray-300 bg-opacity-25 text-white hover:bg-gray-700"
    }

    const baseClass = "py-1.5 w-full rounded-lg font-semibold"
    const classes = `${baseClass} ${VaritneClass[varient]} `

    return <button className={classes} {...props}>
        {children}
    </button>
}
export default Button;