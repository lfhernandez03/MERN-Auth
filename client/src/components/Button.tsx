import React from 'react'

interface ButtonProps {
    name: string,
    title: string,
    onClick: React.MouseEventHandler<HTMLButtonElement>,
    className: string
}

const Button = ({ name, onClick, className, title, children }: ButtonProps & { children?: React.ReactNode }) => {
    return (
        <button name={name} onClick={onClick} title={title} className={`${className} w-full py-2 text-white font-bold bg-blue-500 hover:bg-blue-400 active:bg-blue-600 rounded-full`}>
            {children || title}
        </button>
    )
}

export default Button