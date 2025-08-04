import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ children, className = "", ...props }: ButtonProps) => {
    return (
        <button
            className={`px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition cursor-pointer ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};
