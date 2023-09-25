import React from 'react'

const Input = ({  type, text, name, placeholder, handleOnChange, value }) => {
  return (
    <div className={`flex flex-col gap-2 w-full`}>
        <label className={`font-semibold`} htmlFor={name}>{text}:</label>
        <input 
            className={`p-2 bg-gray-100 rounded focus:outline-none`}
            type={type} 
            name={name} 
            id={name} 
            placeholder={placeholder}
            onChange={handleOnChange}
            value={value}
        />
    </div>
  )
}

export default Input