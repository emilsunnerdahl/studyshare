import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ children, className = "", ...props }: ButtonProps) => {
    return (
        <button
            className={`inline-flex items-center justify-center px-4 py-2
                 rounded-md border border-blue-700
                 bg-white text-blue-800
                 hover:bg-blue-50 active:bg-blue-100
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2
                 shadow-sm transition-colors cursor-pointer ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};
