import React from 'react'

const Card  = (props) => {
  return (
    
    <div className='w-1/2 h-3/4 max-lg:w-3/4 max-md:w-full max-md:h-full flex flex-col items-center bg-gradient-to-tl from-fuchsia-500 via-purple-600 to-violet-700 opacity-80 max-md:absolute max-md:top-0 max-md:translate-x-0 max-md:rounded-none max-lg:translate-x-1/4 translate-x-1/2  translate-y-14 rounded-xl'>{props.children}</div>
  )
}

export default Card