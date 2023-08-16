import React, { useEffect, useState } from 'react'
import Image from 'next/image'

const PosterCarousel = ({ image }) => {

    //https://image.tmdb.org/t/p/original/
    const [data, setData] = useState([])
    const [poster, setPoster] = useState([])

    useEffect(() => {
        if(image){
            setData(image)
        }
        const url = data.map((item) => (`https://image.tmdb.org/t/p/original/${item?.file_path}`)) 
        setPoster(url)
    }, [data, image])

  return (
        <div className='group flex items-center justify-center w-full opacity-80 hover:opacity-100 transition-opacity cursor-pointer relative my-24 md:my-12'>
            <div className='w-[40%] rotate-[-10deg] group-hover:rotate-[-12deg] group-hover:left-8 transition-all ease-in-out duration-200 inline-block absolute left-12'>
                <Image alt='haha' src={poster?.[0]} width={20} height={40} layout='responsive'/>
            </div>
            <div className='w-[40%] rotate-[-1.42deg] group-hover:rotate-[-3deg] transition-all ease-in-out duration-200 inline-block absolute left-16'>
                <Image alt='haha' src={poster?.[1]} width={20} height={40} layout='responsive'/>
            </div>
            <div className='w-[40%] rotate-[5.75deg] group-hover:rotate-[7deg] group-hover:left-28 transition-all ease-in-out duration-200 inline-block absolute left-24'>
                <Image alt='haha' src={poster?.[2]} width={20} height={40} layout='responsive'/>
            </div>
        </div>
  )
}

export default PosterCarousel