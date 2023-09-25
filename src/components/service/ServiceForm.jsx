'use client'
import React, { useState } from 'react'
import Input from '../project/form/Input'
import SubmitButton from '../project/form/SubmitButton'

const ServiceForm = ({ handleSubmit, btnText, projectData }) => {

  const [ service, setService ] = useState({})

  const submit = (ev) => {
    ev.preventDefault()
    projectData.services.push(service)
    handleSubmit(projectData)
  }

  const handleChange = (ev) => {
    setService({...service, [ev.target.name]: ev.target.value})
  }

  return (
    <form onSubmit={submit}>
      <Input
        type="text"
        text="Nome do Serviço"
        name="name"
        placeholder="Insira o nome do serviço"
        handleOnChange={handleChange}
      />
      <Input
        type="number"
        text="Valor do Serviço"
        name="costs"
        placeholder="Insira o valor total"
        handleOnChange={handleChange}
      />
      <Input
        type="text"
        text="Descrição do Serviço"
        name="description"
        placeholder="Insira a descrição do serviço"
        handleOnChange={handleChange}
      />
      <SubmitButton
        text={btnText}
      />
    </form>
    
  )
}

export default ServiceForm