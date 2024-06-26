'use client'

import Loading from '@/components/layout/Loading'
import Section from '@/components/layout/Section'
import Message from '@/components/layout/Message'
import ProjectForm from '@/components/project/ProjectForm'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import React from 'react'
import ServiceForm from '@/components/service/ServiceForm'
import ServiceCard from '@/components/service/ServiceCard'
import TransactionCard from '@/components/transactions/TransactionCard'

const Project = () => {

  const { id } = useParams() // destructuring

  const [project, setProject] = useState([])
  const [services, setServices] = useState([])
  const [dataChanged, setDataChanged] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [showServiceForm, setShowServiceForm] = useState(false)
  const [message, setMessage] = useState()
  const [type, setType] = useState()

  const [currentHistory, setCurrentHistory] = useState([])

  useEffect(() => {

    setTimeout(() => {
      fetch(`https://api-custos-next.onrender.com/project/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json"
        }
      })
        .then((response) => response.json())
        .then((data) => {

          setProject(data)
          setServices(data.services)
          setCurrentHistory(data.history)
        })
        .catch((erro) => {
          console.log(erro)
        })
    }, 500)

  }, [id])

  const editPost = (project) => {

    if (project.budget < project.costs) {
      setMessage("O orçamento não pode ser menor que o custo do projeto")
      setType("error")
      return false
    }

    fetch(`https://api-custos-next.onrender.com/project/${project._id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(project)
    })
      .then((response) => response.json())
      .then((data) => {

        setProject(data)

        const historico = project
        const dadoInserir = { nome: project.name, valor: project.budget }

        historico.history = currentHistory
        currentHistory.push(dadoInserir)

        setShowProjectForm(false)
        setShowServiceForm(false)
        setDataChanged(true)

        setMessage("Projeto atualizado!")
        setType("success")

        setTimeout(() => {
          setMessage('')
        }, 3500)

        saveUpdatedProject(historico)

      })
      .catch((erro) => {
        console.log(erro)
      })

    setDataChanged(false)
  }

  const createService = (project) => {

    console.log(project)

    const lastService = project.services[project.services.length - 1]

    const lastServiceCost = lastService.costs
    const newCost = parseFloat(project.costs) + parseFloat(lastServiceCost)

    if (newCost > parseFloat(project.budget)) {
      setMessage("Orçamento ultrapassado!")
      setType("error")

      setTimeout(() => {
        setMessage('')
      }, 3500)

      project.services.pop()
      return false
    }

    project.costs = newCost;

    fetch(`https://api-custos-next.onrender.com/project/${project._id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(project)
    })
      .then((response) => response.json())
      .then((data) => {
        setProject(data)
        setServices(data.services)
        setShowServiceForm(false)
        setDataChanged(true)
      })
      .catch((erro) => {
        console.log(erro)
      })

    setDataChanged(false)
  }

  const removeService = (_id, costs) => {

    const projectId = project._id
    
    // remove o servico excluido doa array 
    const serviceUpdated = project.services.filter((serv) => serv._id !== _id)

    const projectUpdated = project

    // adiciona o array de serviços atualizado no projeto
    projectUpdated.services = serviceUpdated

    projectUpdated.costs = parseFloat(projectUpdated.costs) - parseFloat(costs)

    fetch(`https://api-custos-next.onrender.com/project/${projectId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(projectUpdated)
    })
      .then((response) => response.json())
      .then((data) => {
        setProject(projectUpdated)
        setServices(serviceUpdated)

        setDataChanged(true)

        setMessage("Serviço removido!")

        setTimeout(() => {
          setMessage('')
        }, 3500)
      })
      .catch((erro) => {
        console.log(erro)
      })

    setDataChanged(false)
  }

  const toggleProjectForm = () => {
    setShowProjectForm(!showProjectForm)
  }

  const toggleServiceForm = () => {
    setShowServiceForm(!showServiceForm)
  }

  const saveUpdatedProject = (historico) => {
    fetch(`https://api-custos-next.onrender.com/project/${historico._id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(historico),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Projeto atualizado com histórico!", data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <>{project.name ?

      <Section className='flex flex-col gap-8'>

        {message && <Message type={type} msg={message} />}

        {/* projetos */}
        <div>

          <div className='flex items-center justify-between pb-10'>
            <h1 className='font-bold text-4xl items-center'>Projeto: <span className='pb-2 border-b-4 border-yellow-400 text-yellow-400'>{project.name}</span></h1>
            <button className='p-2 px-4 relative flex items-center justify-center overflow-hidden font-bold transition duration-300 ease-out border-2 border-yellow-400 bg-yellow-400 group' onClick={toggleProjectForm}>
              <span className='absolute flex items-center justify-center w-full h-full text-yellow-400 duration-300 -translate-x-full bg-white group-hover:translate-x-0'>{!showProjectForm ? "Editar projeto" : "Voltar"}</span>
              <span className='absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease'>{!showProjectForm ? "Editar projeto" : "Voltar"}</span>
              <span className='relative invisible'>{!showProjectForm ? "Editar projeto" : "Voltar"}</span>
            </button>
          </div>

          <div>
            {!showProjectForm ? (
              <div>
                <p>
                  <span>categoria: </span> {project.category.name}
                </p>
                <p>
                  <span>Orçamento: R$</span> {project.budget + ",00"}
                </p>
                <p>
                  <span>Total utilizado: R$ </span> {project.costs + ",00"}
                </p>

              </div>
            ) : (
              <div>

                <ProjectForm
                  handleSubmit={editPost}
                  btnText="Concluir edição"
                  projectData={project}
                />

              </div>
            )}
          </div>

        </div>

        {/* serviços */}
        <div>

          <div className='flex items-center justify-between pb-10'>
            <h2 className='font-bold text-2xl items-center'>Adicione um serviço</h2>
            <button className='p-2 px-4 relative flex items-center justify-center overflow-hidden font-bold transition duration-300 ease-out border-2 border-yellow-400 bg-yellow-400 group' onClick={toggleServiceForm}>
              <span className='absolute flex items-center justify-center w-full h-full text-yellow-400 duration-300 -translate-x-full bg-white group-hover:translate-x-0'>{!showServiceForm ? "Editar serviço" : "Voltar"}</span>
              <span className='absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease'>{!showServiceForm ? "Editar serviço" : "Voltar"}</span>
              <span className='relative invisible'>{!showServiceForm ? "Editar serviço" : "Voltar"}</span>
            </button>
          </div>

          <div>
            {showServiceForm && (

              <ServiceForm
                handleSubmit={createService}
                btnText="Adicioanr serviço"
                projectData={project}
              />

            )}
          </div>

          <div>
            {message && <p>{message}</p>}

            {services.length > 0 ? (
              services.map(service => (
                <ServiceCard
                  key={service._id}
                  id={service._id}
                  name={service.name}
                  costs={service.costs}
                  description={service.description}
                  handleRemove={removeService}
                />
              ))
            ) : (
              <p>Não há serviços cadastrados</p>
            )}
          </div>

        </div>

        {/* Histórico de movimentação */}
        <div>
          <h2 className='font-bold text-2xl items-center pb-10'>Histórico de movimentação</h2>
          <TransactionCard
            dataChanged={dataChanged}
            onDataChange={setDataChanged}
            historyData={project}
          />
        </div>

      </Section>

      : <Loading />}</>
  )
}

export default Project