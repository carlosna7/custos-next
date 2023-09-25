import React from 'react'

const Select = ({  text, name, options, handleOnChange, value }) => {
    return (
      <div className={`flex flex-col gap-2 w-full`}>
          <label className={`font-semibold`} htmlFor={name}>{text}:</label>
          <select className={`p-2 bg-gray-100 rounded focus:outline-none`} 
            name={name} 
            id={name}
            onChange={handleOnChange}
            value={value || ''}>
            <option>Selecione uma opção</option>
            {options.map((options) => (
              <option value={options.id} key={options.id}>{options.name}</option>
            ))}
          </select>
      </div>
    )
  }

export default Select