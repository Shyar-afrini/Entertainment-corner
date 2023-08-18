'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Card from '../(components)/Card'

const PosterDetails = () => {
    const myURL = useSearchParams()
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(true)

    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${myURL.get('id')}/images?api_key=${apiKey}`);
                const data = await response.json();
                setResults(data.posters)
                setLoading(false)
            } catch (err){
                console.log(err)
            }
        };

        fetchData();
    }, []);


return (
    <div className='h-full w-screen mt-20 px-8 sm:px-14 md:px-28 lg:px-44'>
        <h1 className='font-semibold text-xl text-white pb-6'>Posters 🎬📸</h1>
            {loading ? (
                <div className='text-white h-screen text-xl animate-pulse'>
                    Is Loading...
                </div>
            ) : (
                <div className='text-white flex flex-wrap flex-grow justify-start gap-1 sm:gap-4 '>
                    {results.slice(0, 50).map((item, index) => (
                        <Card key={index} display={'hidden'} clicked={'hover:cursor-zoom-out h-[80vh] w-auto z-10'} unClick={'hover:cursor-zoom-in max-w-[100px]'} rotation={' '} image={`https://image.tmdb.org/t/p/original/${item?.file_path}`} />
                    ))}
                </div>
            )}
    </div>
  )
}

export default PosterDetails