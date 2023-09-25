import Link from 'next/link'
import React from 'react'

const ProjectCard = ({ id, name, budget, category, handleRemove }) => {

  // console.log(`log todos id = ${id}`)
  
  const remove = (ev) => {
    // console.log(`log id excluido = ${id}`)
    ev.preventDefault();
    handleRemove(id)
  }

  return (
    <div className='p-4 m-4 border-2 border-black rounded-2xl'>
        <h4 className='p-2 mb-4 bg-slate-800 text-yellow-400'>{name}</h4>
        <p className='text-slate-600'><span className='text-slate-800 font-bold'>Orçamento:</span>R${budget}</p>
        <p><span></span>{category}</p>
        <div className='flex justify-between'>
            <Link href={`/pages/projects/project/${id}`}>Editar</Link>
            <button onClick={remove}>Remover</button>
        </div>
    </div>
  )
}

export default ProjectCard