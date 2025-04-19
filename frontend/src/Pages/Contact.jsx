import React from 'react'
// import Title from '../Components/Title'
// import NewsletterBox from '../Components/NewsletterBox'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className='mt-16'>
      <div className='flex flex-col items-end w-max mb-8'>
            <p className='text-2xl font-medium uppercase'>Contact Us</p>
            <div className='w-16 h-0.5 bg-primary rounded-full'></div>
        </div>
      <div className='flex flex-col md:flex-row gap-10 mb-28 my-10 '>
        <img src={assets.contact} className='w-full md:max-w-[680px]' alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semiblot text-gray-600 text-xl'>Our Store</p>
          <p className='text-gray-500'>Backer Street 335 <br /> Suite 489, Sialkot, pakistan</p>
          <p className='text-gray-500'>Tel: (+92) 321-7077-229 <br />Email: arslanhaiderchand88@gmail.com</p>
          <p className='text-gray-600 font-semibold text-xl'>Careers at CONNECT</p>
          <p className='text-gray-500'>Learn more about our teams and job openings.</p>
          <button className='border border-primary px-8 py-4 text-sm hover:bg-primary-dull hover:text-white transition-all duration-500'>Explore Jobs</button>
        </div>
      </div>
      {/* <NewsletterBox /> */}
    </div>
  )
}

export default Contact