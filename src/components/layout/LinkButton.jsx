import Link from 'next/link'
import React from 'react'

const LinkButton = ({ href, text }) => {
  return (
    <Link className='py-2.5 px-4 relative flex items-center justify-center overflow-hidden font-semibold transition duration-300 ease-out border-2 border-teal-400 bg-teal-400 group' href={href}>
      <span className='absolute flex items-center justify-center w-full h-full text-teal-400 duration-300 -translate-x-full bg-white group-hover:translate-x-0'>{text}</span>
      <span className='absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease'>{text}</span>
      <span className='relative invisible'>{text}</span>
    </Link>
  )
}

export default LinkButton