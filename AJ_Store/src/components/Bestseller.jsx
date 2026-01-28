import React from 'react'
import Productcart from './Productcart'
import { useAppContext } from '../context/Appcontext'

export default function Bestseller() {
  const {products} = useAppContext()

  return (
    <div className="mt-16">
      <p className="text-2xl md:text-3xl font-medium">Best Sellers</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-3 md:gap-6  mt-6">
        {products.filter((product)=>product.inStock).slice(0,8).map((product,index)=>(
          <Productcart key={index} product={product}/>
        ))}
        
      </div>
    </div>
  )
}
