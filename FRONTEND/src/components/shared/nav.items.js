import { navItems } from '@/config/constants'
import React from 'react'

const NavItems = () => {
  return (
    <div className='w-full hidden md:flex items-enter'>

      {navItems.map((i,k)=>(
        <a href={"/"}  className="px-5 text-lg">{i.title}</a>
      ))}
    </div>
  )
}

export default NavItems