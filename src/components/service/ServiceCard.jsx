import React from 'react'

const ServiceCard = ({ id, name, costs, description, handleRemove }) => {

  const remove = (ev) => {
    // console.log(`log id excluido = ${id}`)
    ev.preventDefault();
    handleRemove(id, costs)
  }

  return (
    <div className='p-4 border-2 border-black rounded-2xl mb-4'>
        <h4 className='p-2 mb-4 bg-slate-900 text-yellow-400'>{name}</h4>
        <p className='text-slate-600'><span className='text-slate-800 font-bold'>Valor do serviço: </span>R${costs}</p>
        <p><span></span>{description}</p>
        <div className='flex justify-between'>
            <button onClick={remove}>Excluir</button>
        </div>
    </div>
  )
}

export default ServiceCard