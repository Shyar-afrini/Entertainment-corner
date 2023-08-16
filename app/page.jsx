import React from 'react'
import Featured from './(components)/Featured'
import Popular from './(components)/Popular'
import PopularSeries from './(components)/PopularSeries'
import UpComming from './(components)/UpComming'
import Posters from './(components)/Posters'


const page = () => {

  return (
    <div>
      <Featured />
      <Popular />
      <PopularSeries />
      <UpComming />
      <Posters />
    </div>
  )
}


export default page