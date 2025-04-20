import React, { useEffect, useState } from 'react'
import { useAppContext } from '../Context/AppContext'
import ProductCard from '../Components/ProductCard';

const AllProducts = () => {

    const {products, searchQuery} = useAppContext();

    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(()=>{
        if(searchQuery.length > 0) {
            setFilteredProducts(products.filter(
                product => product.name.toLowerCase().includes(searchQuery.toLowerCase())
            ))
        } else {
            setFilteredProducts(products);
        }
    },[products, searchQuery])

  return (
    <div className='flex flex-col mt-16'>
      <div className='flex flex-col items-end w-max'>
        <p className='text-2xl font-medium uppercase'>All Products</p>
        <div className='w-20 h-0.5 bg-primary rounded-full'></div>
      </div>

      <div className='flex flex-wrap mt-6 gap-6'>
        {filteredProducts.filter((product)=> product.inStock).map((product, index)=>(
            <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  )
}

export default AllProducts
