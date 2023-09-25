import React from 'react'

const Section = ({ className, children }) => {
  return (
    <section className={`mt-24 pt-16 mx-40 ${className}`}> {children} </section>
  )
}

export default Section