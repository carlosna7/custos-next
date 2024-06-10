'use client'

import { useEffect, useState } from 'react'
import Input from './form/Input'
import Select from './form/Select'
import SubmitButton from './form/SubmitButton'

const ProjectForm = ({ handleSubmit, btnText, projectData }) => {

    const [categories, setCategories] = useState([]);
    const [project, setProject] = useState(projectData || {})

    useEffect(() => {
        fetch('https://json-server-carlosna7.vercel.app/categories', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then((response) => response.json())
        .then((data) => {
            setCategories(data)
        })
        .catch((erro) => {
            console.log(erro)
        })
    }, [])

    const submit = (ev) => {
        ev.preventDefault()
        handleSubmit(project)
    }

    const handleChange = (ev) => {
        const { name, value } = ev.target
      
        const updatedProject = { ...project }

        updatedProject[name] = value

        let valueName = updatedProject.name;
        let valueBudget = updatedProject.budget;
      
        if (name === "name") {
            valueName = value
        } else if (name === "budget") {
            valueBudget = value
        }
      
        updatedProject.history = [ { nome: valueName, valor: valueBudget } ]
      
        setProject(updatedProject)
    }     

    const handleCategory = (ev) => {
        setProject({
            ...project, 
            category: {
                id: ev.target.value,
                name: ev.target.options[ev.target.selectedIndex].text,
            },
        })
    }
 
  return (
    <form onSubmit={submit} className='flex flex-col gap-4 w-full items-center' >
        <Input 
            type="text" 
            text="Nome do projeto"
            name="name"
            placeholder="Insira o nome do projeto"
            handleOnChange={handleChange}
            value={project.name}
        />
        <Input
            type="number"
            text="Orçamento do projeto"
            name="budget"
            placeholder="Insira o orçamento total"
            handleOnChange={handleChange}
            value={project.budget}
        />
        <Select 
            name="category_id"
            text="Selecione a cetegoria"
            options={categories}
            handleOnChange={handleCategory}
            value={project.category ? project.category.id : ''}
        />
        <SubmitButton
            text={btnText}
        />
        
    </form>
  )
}

export default ProjectForm