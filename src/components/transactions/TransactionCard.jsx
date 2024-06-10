'use client'

import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const TransactionCard = ({ dataChanged, onDataChange, historyData }) => {

	const { id } = useParams()

  const [ historyItems, setHistoryItems ] = useState([])
  const [ currentData, setCurrentData ] = useState(null)
  const [ firstValue, setFirstValue ] = useState(null)
  const [ isLoading, setIsLoading ] = useState(true)

  useEffect(() => {
    // Fetch inicial quando a página carrega
    if (isLoading) {
      fetch(`https://api-custos-next.onrender.com/project/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {

          // console.log("dados projeto atual")
          // console.log(data)

          setCurrentData(data)
          setFirstValue(data.history[0])
          setHistoryItems(data.history)

          setIsLoading(false)
        })
        .catch((erro) => {
          console.log(erro)
        })
    }
  }, [id, isLoading])

  useEffect(() => {

    if (dataChanged) {
      fetch(`https://api-custos-next.onrender.com/project/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          
          // console.log("dados projeto alterado")
          // console.log(data)

          setHistoryItems(data.history)
          setCurrentData(data)

          submitHistory()
        })
        .catch((erro) => {
          console.log(erro);
        })
    }
  }, [id, dataChanged, onDataChange])

  const submitHistory = () => {
    historyData.history.push()
  }

  return (
    <div className='flex flex-col p-4 border-2 border-black rounded-2xl'>

      <p className='flex justify-center p-6'>Valores do Projeto Atual:</p>
      {currentData && (
				<div className='flex px-20 justify-between'>
					<p>{currentData.name}</p>
          <p>{currentData.budget}</p>
				</div>
			)}

      <p className='flex justify-center p-6'>Primeiros valores do histórico:</p>
      {firstValue && (
        <div className='flex px-20 justify-between'>
          <p>{firstValue.nome}</p>
          <p>{firstValue.valor}</p>
        </div>
      )}

      {historyItems.length > 0 ? (
        <>
          {historyItems.map((item, index) => (
            index !== 0 ? (
              <div className='flex px-20 justify-between' key={item.id}>
                <p>{item.nome}</p>
                <p>{item.valor}</p>
              </div>
            ) : null
          ))}
        </>
        
      ) : (
        <p>menor que zero</p>
      )}

    </div>
  )
}

export default TransactionCard