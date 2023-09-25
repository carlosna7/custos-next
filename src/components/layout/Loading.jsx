'use client'
import React from 'react'
import { Ring } from '@uiball/loaders'

const Loading = () => {
  return (
    <div className="flex justify-center">
      <div className='flex items-center justify-center w-96 h-96'>
        <Ring size={70} lineWeight={2} speed={2} color="black"/>
      </div>
    </div>
  )
}

export default Loading