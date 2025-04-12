import React from 'react'
import Header from '../Components/Header'
import Categories from '../Components/Categories'
import BestSeller from '../Components/BestSeller'
import BottomBanner from '../Components/BottomBanner'
import NewsLetter from '../Components/NewsLetter'

const Home = () => {
  return (
    <div className='mt-10'>
      <Header />
      <Categories />
      <BestSeller />
      <BottomBanner />
      <NewsLetter />
    </div>
  )
}

export default Home
