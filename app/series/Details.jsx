
'use client'

import React, { useEffect, useState } from 'react';
import Tags from '../(components)/Tags';
import Button from '../(components)/Button';
import Image from 'next/image';
import star from '../../public/Star.png';
import Card from '../(components)/Card';

const Details = ({ series_id }) => {
  const [data, setData] = useState({});
  const [backdrop, setBackdrop] = useState('');
  const [title, setTitle] = useState('');
  const [posterUrl, setPosterUrl] = useState('');

  const apiKey = process.env.NEXT_PUBLIC_API_KEY

  useEffect(() => {
    const fetchData = async () => {
      try {
          const response = await fetch(
            `https://api.themoviedb.org/3/tv/${series_id}?api_key=${apiKey}`
          )
          
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [series_id]);

  useEffect(() => {
    if (data) {
      const backdrop_path = `https://image.tmdb.org/t/p/original/${data?.backdrop_path}`;
      setBackdrop(backdrop_path);
      setTitle(data?.name);
      const poster_path = `https://image.tmdb.org/t/p/original/${data?.poster_path}`;
      setPosterUrl(poster_path);
    }
  }, [data]);

  return (
    <>
      <div className='h-[100vh] w-screen z-0 relative'>
        <div className='bg-gradient-to-b from-transparent flex justify-center to-[#090909] w-full z-0 h-[100vh] absolute'></div>

        <img
          src={backdrop}
          alt='Movie backdrop'
          className='w-full h-screen object-cover selection:bg-none'
        />

        <div className='absolute w-full bottom-10 xs:bottom-20 flex flex-col md:flex-row justify-center items-center gap-4 px-0 xs:px-4 md:px-20 lg:px-24 xl:px-32 2xl:px-40 z-10'>
          <div className='hidden lg:flex flex-shrink-0 justify-center px-4 md:w-auto h-auto w-[70%]'>
            <Card
              image={posterUrl}
              display={'hidden'}
              styles={'active:scale-100 hover:scale-100 cursor-default max-w-sm md:max-w-xs'}
            />
          </div>
          <div className='px-4'>
            <h1 className='text-white md:pr-0 text-4xl md:text-6xl font-[700] uppercase tracking-[-0.0725rem] md:pb-4 pb-2 flex-col flex-wrap flex gap-4 justify-center'>
              {title}
              <span className='flex items-center gap-2 pb-4'>
                <span className='text-3xl'>{data?.vote_average}</span>
                <Image
                  src={star}
                  width={20}
                  height={20}
                  className='w-auto h-auto'
                  alt='rating'
                  />
              </span>
            </h1>
            <div className='flex gap-2'>
              <Tags styles={'bg-[#DB4D4D]'} tagName={'Action'} />
              <Tags styles={'bg-[#4D75DB]'} tagName={'Sc-Fi'} />
              <Tags styles={'bg-[#DBD54D]'} tagName={'Thriller'} />
            </div>
            <div className='text-white text-base leading-[150%] pt-4 flex flex-shrink'>
              {data.overview}
            </div>
            <div>
              <Button buttonName={'Add to list'} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
// 324857