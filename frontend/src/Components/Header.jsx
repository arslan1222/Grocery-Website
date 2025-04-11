import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='relative'>
      {/* Background Images */}
      <img className='w-full hidden md:block' src={assets.main_banner_bg} alt="" />
      <img className='w-full md:hidden' src={assets.main_banner_bg_sm} alt="" />

      {/* Centered Content */}
      <div className='absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-24 md:pb-0 md:pl-18 lg:pl-24  px-4'>
        <h1 className='text-3xl md:text-3xl lg:text-5xl font-bold text-center md:text-left maxw-72 md:max-w-80 lg:max-w-105 leading-tight lg:leading-105'>
          Lorem ipsum dolor sit amet consectetur
        </h1>

        <div className='flex flex-col md:flex-row items-center gap-4 mt-6 font-medium'>
          <Link to='/products' className='flex items-center gap-2 px-7 md:px-9 py-3 bg-primary hover:bg-primary-dull transition rounded text-white cursor-pointer'>
            Shop Now
            <img className='transition group-hover:translate-x-1' src={assets.white_arrow_icon} alt="" />
          </Link>
          <Link to='/products' className='group flex items-center gap-2 cursor-pointer text-black'>
            Explore Deals
            <img className='transition group-hover:translate-x-1' src={assets.black_arrow_icon} alt="" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Header
