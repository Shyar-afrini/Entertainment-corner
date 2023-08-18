"use client"


import React, { useEffect, useState } from 'react';
import Tags from './Tags';
import Button from './Button';
import star from '../../public/Star.png'
import Image from 'next/image';

const Featured = () => {
  const [data, setData] = useState([]);
  const [backdrop, setBackdrop] = useState('');
  const [title, setTitle] = useState('');
  const [randomNumber, setRandomNumber] = useState(Math.floor(Math.random() * 20))

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    const url =
      `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;
    const handleRequest = async () => {
      try {
        const fetchedData = await fetch(url);
        const jsonData = await fetchedData.json();
        const data = jsonData.results;
        setData(data);
      } catch (err) {
        console.log(err);
      }
    };
    handleRequest();
  }, [apiKey]);

  useEffect(() => {
    if (data.length > 0) {
      const backdrop_path = `https://image.tmdb.org/t/p/original/${data[randomNumber]?.backdrop_path}`;
      setBackdrop(backdrop_path);
      setTitle(data[randomNumber]?.title);
    }
  }, [data]);

  const vote_average = data[randomNumber]?.vote_average;
  const id = data[randomNumber]?.id;

  return (
    <div className='h-[100vh] w-screen z-0 overflow-hidden'>
      <div className='bg-gradient-to-b from-transparent to-[#090909] w-full z-0 h-[100vh] absolute'></div>

      <img 
      src={backdrop} 
      alt='Movie Poster' 
      className='w-full h-screen object-cover selection:bg-none' 
      layout='fill'
      />

      <div className='absolute bottom-20 left-4 md:left-20 lg:left-32 xl:left-40 2xl:left-58 z-10'>
        <h1 className='text-white md:pr-0 text-4xl md:text-6xl font-[700] uppercase tracking-[-0.0725rem] md:pb-4 pb-2 flex-col flex gap-4 justify-center'>
          {title}
          <span className='flex items-center gap-2'>
            <span className='text-3xl'>
              {vote_average}
            </span>
            <Image src={star} className='w-auto h-5 inline-block' alt='rating'/>
          </span>
        </h1>
        <div className='flex gap-2'>
          <Tags styles={'bg-[#DB4D4D]'} tagName={'Action'} />
          <Tags styles={'bg-[#4D75DB]'} tagName={'Sc-Fi'} />
          <Tags styles={'bg-[#DBD54D]'} tagName={'Thriller'} />
        </div>
          <Button buttonName={'Watch'} ButtonUrl={id} pathName={'/details'} />
      </div>
    </div>
  );
};

export default Featured;
