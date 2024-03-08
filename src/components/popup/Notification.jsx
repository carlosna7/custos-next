'use client'

import React, { useState } from 'react'

const Notification = () => {

    const [isOpen, setIsOpen] = useState(true)

    const close = () => {
        setIsOpen()
    }

    return (
        <>
        
            {isOpen
                ? 
                <div className='w-[300px] h-[200px] p-4 bg-teal-100 rounded-2xl absolute right-8 bottom-8'>
                    <p>Notification</p>
                    <button onClick={close}></button>
                    <a target='_blank' rel="noreferrer" href="https://github.com/carlosna7/api-custos-next">Acesse a API neste link: AQUI!</a> 
                </div>
                : 
                null
            }

        </>
    )
}

export default Notification;
