'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Squash as Hamburger } from 'hamburger-react'

const NavBar = () => {

    const [open, setOpen] = useState(false)
    const [nav, setNav] = useState(false)

    const handleNav = () => {
        setNav(!nav)
    }

    const handleClick = useRef()

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if(!handleClick.current.contains(e.target)){
                setNav(false)
            }
        }

        document.addEventListener('mousedown', handleOutsideClick)
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick)
        }
    })


  return (
    <div className='flex justify-center z-20 relative'>
        <nav className='text-white bg-black/70 backdrop-blur-sm text-md fixed rounded-b-sm flex justify-between w-screen md:w-[80%] h-12 items-center lg:px-22 md:px-18 px-6'>
            <div>
                <Link href="/" className='tesla text-md md:text-xl absolute top-3 z-50'>
                    Entertainment
                </Link>
            </div>

            <div className='flex md:hidden z-10'>
                <Hamburger toggled={open} toggle={setOpen} size={24} />
            </div>
            <ul id='list' className={`bg-[#0e0e0e] backdrop-blur-sm md:hidden flex flex-col justify-between items-center w-screen absolute left-0 top-0 z-0 ${ open? 'h-[100dvh] pt-40' : 'h-0 opacity-0 pt-20'} transition-all ease-in-out delay-100 duration-300 ` }>
                <li onClick={handleNav} className=' cursor-pointer'>
                    Search
                </li>
                <li>
                    <Link href="/movies">
                        Movies
                    </Link>
                </li>
                <li>
                    <Link href="/tv-shows">
                        TV Shows
                    </Link>
                </li>
                <li>
                    <Link href="/">
                        Home
                    </Link>
                </li>
                <div className='text-center py-8'>
                    Made with ❤️ by <a href="https://github.com/Shyar-afrini" target='blank' className='underline underline-offset-2'>Shyar</a>
                </div>
            </ul>

            <ul className='md:flex justify-between w-[20rem] hidden'>
                <li onClick={handleNav} className=' cursor-pointer'>
                    Search
                </li>
                <li>
                    <Link href="/movies">
                        Movies
                    </Link>
                </li>
                <li>
                    <Link href="/tv-shows">
                        TV Shows
                    </Link>
                </li>
                <li>
                    <Link href="/">
                        Home
                    </Link>
                </li>
            </ul>
        </nav>
            <div className={`h-screen w-screen flex justify-center items-center z-40 absolute backdrop-blur-sm ${nav ? 'flex' : 'hidden'}`}>
                <input ref={handleClick} className='h-12 w-[80%] rounded-md bg-white/80 text-[#676767] text-center outline-none' placeholder='Search anything 😜' type="text" />
            </div>
    </div>
  )
}

export default NavBar