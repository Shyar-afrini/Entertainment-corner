'use client'

import React, { useEffect, useState} from 'react'
import { useSearchParams } from 'next/navigation'

const Profile = ({ picture, character, person }) => {
    return (
        <div className='flex flex-col gap-y-2 justify-between items-center'>
            <img src={picture} className='rounded-full bg-white w-40 object-cover h-auto aspect-square'/>
            <div className=' w-40 text-center flex flex-col items-center'>
                <h1>{character}</h1>
                <h1 className='text-gray-400'>{person}</h1>
            </div>
        </div>
    )
}

const Cast = ({type}) => {
    const [data, setData] = useState([])

    const params = useSearchParams()
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    useEffect(() => {
        const dataFetching = async () => {
            try{
                const req = await fetch(`https://api.themoviedb.org/3/${type}/${params.get('id')}/credits?api_key=${apiKey}`)
                const res = await req.json()
                setData(res.cast)
            }catch(err) {
                console.log(err)
            }
        }

        dataFetching()
    }, [params.get('id')])

  return (
        <div className='px-8 sm:px-14 md:px-28 lg:px-44 my-12 mt-44 w-screen h-fit text-center text-white'>
            <h1 className='font-semibold text-4xl pb-6 mb-24'>Crew 🎭🌟</h1>
            <div className='flex flex-wrap justify-center items-center gap-12'>
                {data.slice(0, 6).map((person, index) => (
                    <Profile key={index} picture={`https://image.tmdb.org/t/p/original/${person.profile_path}`} character={person.character} person={person.name}/>
                ))}
            </div>
        </div>
  )
}

export default Cast