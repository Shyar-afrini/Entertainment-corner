'use client'

import React, { useState, useEffect, useRef } from 'react';
import star from '../../public/Star.png'
import Image from 'next/image';

const Card = ({ image, title, rating, styles, display, rotation, clicked, unClick}) => {
  const [click, setClick] = useState(false)
  const handleClicking = () => {
    setClick(!click)
  }

  const handleOutsideClick = useRef()

  useEffect(() => {
    const outsideClick = (e) => {
      if(!handleOutsideClick.current.contains(e.target)){
        setClick(false)
      }
    }

    document.addEventListener('mousedown', outsideClick);
    return () => {
      document.removeEventListener('mousedown', outsideClick)
    }
  }, [])

  return (
    <div className={`text-white font-normal ${styles} ${click? clicked : unClick} rounded overflow-hidden shadow-lg cursor-default transform transition-transform `}>
      <img ref={handleOutsideClick} onClick={handleClicking} className={`w-full ${rotation} ${click? clicked : unClick}`} src={image} alt={title} />
      <div className='py-4'>
        <div className='text-base mb-2'>{title}</div>
        <div className=' text-sm font-light flex gap-1 items-center'>
          <Image src={star} width={20} alt={'haha'} className={`${display}`}/>
          <h1 className='pt-1'>
           {rating}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Card;




//grayscale hover:grayscale-0 transition-all ease-in-out duration-300 blur-sm hover:blur-none