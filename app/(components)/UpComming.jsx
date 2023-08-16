'use client'

import React, { Fragment, useEffect, useState } from 'react'
import Card from './Card'
import Link from 'next/link'


const UpComming = () => {

  const [data, setData] = useState([])
  const [backdrop, setBackdrop] = useState([])

  const apiKey = process.env.NEXT_PUBLIC_API_KEY

  useEffect(() => {
    const handleRequest = async() => {
      try{
        const req = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`)
        const res = await req.json()
        const data = res.results
        setData(data)
      }catch(err){
        console.log(err)
      }
    }

    handleRequest()
  }, [])

  useEffect(() => {
    const backdropUrls = data.map((data) =>
      `https://image.tmdb.org/t/p/original/${data.backdrop_path}`
    );
    setBackdrop(backdropUrls);
  }, [data]);

  return (
    <div className='flex flex-col justify-center text-white w-screen px-8 sm:px-14 md:px-28 lg:px-44 mt-44'>
      <div className='flex justify-between'>
        <h1 className='font-semibold text-xl pb-6 '>Upcoming releases 🚀📅</h1>
        <Link
          href='/movies'
          className='text-[#D0D0D0] font-light text-md underline underline-offset-2 cursor-pointer'
        >
          See all
        </Link>
      </div>
      <div className='w-full h-auto flex flex-col md:flex-row justify-between gap-4 gap-y-16'>
        {backdrop.slice(0, 3).map((url, index) => (
            <Link 
            className='w-full flex flex-grow justify-center'
            key={data[index]?.id}
            href={{
              pathname: '/details',
              query: {
                id: `${data[index]?.id}`
              }
            }}>
              <Card
                key={data[index]?.id}
                image={url}
                title={data[index]?.title}
                styles={'hover:scale-105 cursor-pointer text-center max-w-2xl grayscale-[50%] hover:grayscale-0 transition-all duration-200'}
                display={'hidden'}
              />
            </Link>
          ))}
      </div>
    </div>
  )
}

export default UpComming