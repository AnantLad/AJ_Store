import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/Appcontext';
import Productcart from '../components/Productcart';

export const AllProduct = () => {
  const { products, searchQuery } = useAppContext();
  const [FiltereProducts, setFilterProducts] = useState([]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      setFilterProducts(
        products.filter(product =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilterProducts(products);
    }
  }, [products, searchQuery]);

  return (
    <div className='mt-16 flex flex-col'>
      <div className='flex flex-col items-center w-max'>
        <p className="text-2xl font-medium uppercase">All Products</p>
        <div className='w-20 h-0.5 bg-green-600 rounded-full'></div>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mt-10'>
        {FiltereProducts.filter(product => product.inStock).map((product, index) => (
          <div key={product._id || index} className='mt-5 object-center'>
            <Productcart product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};
