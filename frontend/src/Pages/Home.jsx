import React from 'react'
import Header from '../Components/Header'
import Categories from '../Components/Categories'
import BestSeller from '../Components/BestSeller'

const Home = () => {
  return (
    <div className='mt-10'>
      <Header />
      <Categories />
      <BestSeller />
    </div>
  )
}

export default Home
