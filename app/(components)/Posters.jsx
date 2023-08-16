'use client'

import React, { useState, useEffect } from 'react';
import PosterCarousel from './PosterCarousel';
import Link from 'next/link';

const Posters = () => {
    const [carouselsData, setCarouselsData] = useState([]);

    const ids = [457332, 569094, 872585];
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dataPromises = ids.map(async (id) => {
                    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/images?api_key=${apiKey}`);
                    const data = await response.json();
                    return data.posters;
                });

                const carouselsData = await Promise.all(dataPromises);
                setCarouselsData(carouselsData);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='w-screen px-8 sm:px-14 md:px-28 lg:px-44'>
            <div className='flex justify-between mt-44'>
              <h1 className='font-semibold text-xl text-white pb-6'>Movie Posters 🎬📸</h1>
              <Link
                href='/movies'
                className='text-[#D0D0D0] font-light text-md underline underline-offset-2 cursor-pointer'
              >
                See all
              </Link>
            </div>
            <div className='w-full h-48 flex flex-col md:flex-row my-12 mb-24'>
                    <PosterCarousel image={carouselsData?.[0]} />
                    <PosterCarousel image={carouselsData?.[1]} />
                    <PosterCarousel image={carouselsData?.[2]} />
            </div>
        </div>
    );
};

export default Posters;