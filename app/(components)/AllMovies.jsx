
'use client'

import React, { useState, useEffect } from 'react';
import Card from './Card';
import Link from 'next/link';

const Popular = () => {
  const [results, setResults] = useState([]);
  const [posterUrls, setPosterUrls] = useState([]);

  const apiKey = process.env.NEXT_PUBLIC_API_KEY

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const fetchingData = await fetch(
          `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`
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
      <div>
        <h1 className='font-semibold text-xl pb-6'>Movies 🌟🎬</h1>
      </div>
      <div className='grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-y-16 gap-1 sm:gap-2 md:gap-4'>
        {posterUrls.slice(0, 20).map((url, index) => (
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
              styles={'hover:scale-105 cursor-pointer'}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Popular;
