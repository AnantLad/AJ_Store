import React from 'react'

export const NewsLetter = () => {
  return (
    <div >
            <div class="flex flex-col items-center  text-gray-900/60 rounded-xl max-w-lg md:w-full w-11/12 md:py-8 py-6">
            <div class="flex items-center justify-center p-3 bg-red-100 rounded-full">
                <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/model/faceIcon.svg" alt="faceIcon"/>
            </div>
            <h2 class="text-slate-900 font-medium mt-3 text-lg">Never Miss any deals !</h2>
            <p class="text-sm text-slate-900/60 mt-1 md:w-80 w-72 text-center">Subscribe to get the latest offers, new arrivals and exclusive discount </p>
            <div class="flex items-center mt-5 w-full md:px-16 px-6">
                <input type="email" placeholder="Enter Your Email" class="text-sm border-r-0 outline-none border border-gray-500/50 pl-3 w-full h-10 rounded-l-md"/>
                <button type="button" class="font-medium text-sm text-white bg-green-600 w-36 h-10 rounded-r-md">Subscribe</button>
            </div>
            <div class="w-full h-px bg-gray-500/20 mt-5"></div>
            <p class="text-sm mt-4">Already a subscriber? <a class="text-blue-500 underline" href="#">Sign In</a></p>
            </div>

    </div>
  )
}
