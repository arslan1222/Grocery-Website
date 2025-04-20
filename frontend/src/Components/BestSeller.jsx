import React from 'react'
import ProductCard from './ProductCard'
import { useAppContext } from '../Context/AppContext'

const BestSeller = () => {

  const {products} = useAppContext()
  
  return (
    <div className='mt-16'>
        <p className='text-2xl md:text-3xl font-medium'>Best Sellers</p>

        <div className='flex flex-wrap mt-6 gap-6'>
          {products.filter((product)=>product.inStock).slice(0,5).map((product, index)=>(
            <ProductCard key={index} product={product}/>
          ))}
          
        </div>
    </div>
  )
}

export default BestSeller
