import React from 'react'

interface InputProps {
    name: string,
    placeholder: string,
    type: string,
    value: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    className: string
    required: boolean
}

const Input = ({ name, placeholder, type, onChange, value, className, required}: InputProps) => {
  return (
    <input type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} required={required} className={`${className} w-full border-gray-200 border rounded-xl outline-0 py-2`}/>
  )
}

export default Input