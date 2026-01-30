import React from 'react'
import { assets, features } from '../assets/assets'

export const BottomBanner = () => {
  return (
    <div className='relative mt-24'>
        <img src={assets.bottom_banner_image} alt='banner' className='w-full hidden md:block'></img>
        <img src={assets.bottom_banner_image_sm} alt='banner' className='w-full  md:hidden'></img>

        <div className='absolute inset-0 flex flex-col items-center md:items-end md:justify-center pt-16 md:pt-0 md:pr-24'>
        <div>
          <h1 className='text-2xl md:text-3xl font-semibold mb-6 text-primary '>Why AJ Store is the best.</h1>
        </div>
        <div className="">
            {features.map((feature, index) => (
              <div
                key={index}
                className='flex items-start gap-4 mt-4 w-full md:max-w-md md:items-center '
              >
                <img
                  src={feature.icon}
                  alt={feature.title}
                  className='md:w-11 w-9 mt-1 shrink-0'
                />
                <div className='flex flex-col'>
                  <h3 className='text-lg md:text-xl font-semibold leading-snug'>
                    {feature.title}
                  </h3>
                  <p className='text-gray-500/70 text-xs md:text-sm leading-snug'>
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
      </div>


    </div>
  )
}
