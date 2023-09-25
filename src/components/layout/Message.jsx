'use client'
import React, { useEffect, useState } from 'react'

const Message = ({ type, msg }) => {

  const [visible, setVisible] = useState(false)

  const success = ` w-full p-3 border-2 rounded-xl text-center border-green-500 text-green-700 bg-green-100`
  const error = `w-full p-3 border-2 rounded-xl text-center border-red-500 text-red-700 bg-red-100`

  useEffect(() => {

    if(!msg) {
      setVisible(false)
      return
    }

    setVisible(true)

    const timer = setTimeout(() => {
      setVisible(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [msg])

  return (
    <>
      {visible && (
        <div className={`${type === 'success' ? success : error}`}>
          {msg}
        </div>
      )}
    </>
  )
}

export default Message