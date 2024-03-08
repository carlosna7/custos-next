'use client'

import Section from '@/components/layout/Section'
import ProjectForm from '@/components/project/ProjectForm'
import { useRouter } from 'next/navigation'
import React from 'react'

const NewProject = () => {

  const router = useRouter()
  const query = "Projeto criado com sucesso!"

  const createPost = (project) => {

    
    project.costs = 0
    project.services = []
    project.history
    
    fetch('http://localhost:5000/', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
    .then((response) => response.json())
    .then((data) => {
      router.push(`/pages/projects?query=${query}`)
    })
    .catch((erro) => {
      console.log(erro)
    })
  
  }

  return (
    <Section className="flex flex-col gap-4 items-center">
      <h1 className='font-bold text-4xl pb-8'>Criar novo projeto!</h1>
      <p>Crie seu projeto para depois acidionar o orçamentos e os serviçõs que serão utilizados</p>
      <ProjectForm handleSubmit={createPost} btnText="CRIAR PROJETO" />

    </Section>
  )
}

export default NewProject