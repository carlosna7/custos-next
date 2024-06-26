'use client'

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Navbar = () => {

  return (
    <div className='flex items-center justify-between fixed top-0 left-0 right-0 p-4 px-40 bg-teal-400'>
      <div>
        <Link href="/">
          <Image src='/images/logo.png' alt='logo' width={64} height={64} />
        </Link> 
      </div>

      <ul className='flex items-center justify-center gap-6'>
          <li className='text-lg font-bold'><Link href="/pages/projects">PROJECTS</Link></li>
      </ul>
    </div>
  )
}

export default Navbar