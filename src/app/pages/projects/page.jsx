'use client'

import LinkButton from '@/components/layout/LinkButton'
import Message from '@/components/layout/Message'
import Section from '@/components/layout/Section'
import ProjectCard from '@/components/project/ProjectCard'
import { useSearchParams } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import Loading from '@/components/layout/Loading'

const Projects = () => {

  const [ projectsList, setProjectsList] = useState([]);
  const [ removeLoading, setRemoveLoading ] = useState(false)
  const [ projectMsg, setProjectMsg ] = useState('')

  const searchParams = useSearchParams();  
  const message = searchParams.get('query');

  useEffect(() => {    

    fetch("https://json-server-carlosna7.vercel.app/projects", {
      method: "GET",
      headers: {
        "Content-type": "application/json"
      }
    })
    .then((response) => response.json())
    .then((data) => {
      setProjectsList(data)
      setRemoveLoading(true)
    })
    .catch((erro) => {
      console.log(erro)
    })
 
  }, [])

  const removeProject = (id) => {

    console.log(`log id da projects = ${id}`)

    fetch(`https://json-server-carlosna7.vercel.app/projects/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json"
      }
    })
    .then((response) => response.json())
    .then((data) => {
      setProjectsList(projectsList.filter((proj) => proj.id !== id))
      setProjectMsg("Projeto removido com sucesso")

      setTimeout(() => {
        setProjectMsg('')
      }, 3500)

    })
    .catch((erro) => {
      console.log(erro)
    })
  }
  
  return (
    <Section className="flex justify-center flex-col">

      <div className='flex items-start justify-between pb-10'>
        <h1 className='font-bold text-4xl'>Meus <span className='pb-1 border-b-4 border-yellow-400'>projetos</span></h1>
        <LinkButton href="/pages/projects/newProject" text="NOVO PROJETO"/>
      </div>

      <Message msg={message} type="success"/>
      {projectMsg && <Message msg={projectMsg} type="error"/>}

      <div className='grid grid-cols-3'>
        {projectsList.length > 0 && projectsList.map((project) => 
          <ProjectCard
            id={project.id} 
            name={project.name}
            budget={project.budget}
            category={project.category.name}
            key={project.id} 
            handleRemove={removeProject}
          />
        )}
      </div>

      <div className='flex justify-center'>
        {!removeLoading && <Loading />}
        {removeLoading && projectsList.length === 0 && 
          <p>Não há projetos cadastrados</p>
        }
      </div>
      
    </Section>
  )
}   

export default Projects