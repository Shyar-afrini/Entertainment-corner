import React from 'react';
import Details from './Details';

const Page = ({searchParams}) => {


  return (
    <div>
      <Details movie_id={searchParams.id} />
    </div>
  );
};

export default Page;
