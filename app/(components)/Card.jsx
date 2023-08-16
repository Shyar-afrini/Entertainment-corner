import React from 'react';
import star from '../../public/Star.png'
import Image from 'next/image';

const Card = ({ image, title, rating, styles, display, rotation}) => {
  return (
    <div className={`text-white font-normal ${styles} rounded overflow-hidden shadow-lg cursor-default transform transition-transform `}>
      <img className={`w-full ${rotation}`} src={image} alt={title} />
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