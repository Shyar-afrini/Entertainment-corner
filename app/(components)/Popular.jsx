'use client'

import React, { useState, useEffect } from 'react';
import Card from './Card';
import Link from 'next/link';
import Glider from 'react-glider';
import 'glider-js/glider.min.css';

const Popular = () => {
  const [results, setResults] = useState([]);
  const [posterUrls, setPosterUrls] = useState([]);

  const apiKey = process.env.NEXT_PUBLIC_API_KEY

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const fetchingData = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
        );
        const jsonData = await fetchingData.json();
        const data = jsonData.results;
        setResults(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPopularMovies();
  }, []);

  useEffect(() => {
    const posterUrls = results.map((result) =>
      `https://image.tmdb.org/t/p/original/${result.poster_path}`
    );
    setPosterUrls(posterUrls);
  }, [results]);

  return (
    <div className='text-white h-full flex flex-col justify-center px-8 sm:px-14 md:px-28 lg:px-44 my-12 mt-44'>
      <div className='flex justify-between'>
        <h1 className='font-semibold text-xl pb-6'>Popular Movies 🌟🎬</h1>
        <Link
          href='/movies'
          className='text-[#D0D0D0] font-light text-md underline underline-offset-2 cursor-pointer'
        >
          See all
        </Link>
      </div>
      <div className='sm:grid hidden sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-y-16 gap-1 sm:gap-2 md:gap-4'>
        {posterUrls.slice(0, 12).map((url, index) => (
          <Link 
          key={results[index]?.id}
          href={{
            pathname: '/details',
            query: {
              id: `${results[index]?.id}`
            }
          }}>
            <Card
              key={results[index]?.id}
              image={url}
              title={results[index]?.title}
              rating={results[index]?.vote_average}
              styles={'hover:scale-105 cursor-pointer max-w-sm md:max-w-xs'}
            />
          </Link>
        ))}
      </div>
      <Glider
      draggable
      hasDots
      slidesToShow={4}
      slidesToScroll={1}
      className=' overflow-x-scroll sm:hidden'
      >
      {posterUrls.slice(0, 12).map((url, index) => (
          <Link 
          key={results[index]?.id}
          href={{
            pathname: '/details',
            query: {
              id: `${results[index]?.id}`
            }
          }}>
            <Card
              key={results[index]?.id}
              image={url}
              title={results[index]?.title}
              rating={results[index]?.vote_average}
              styles={'hover:scale-105 cursor-pointer max-w-sm md:max-w-xs pr-4'}
            />
          </Link>
        ))}
      </Glider>
    </div>
  );
};

export default Popular;
