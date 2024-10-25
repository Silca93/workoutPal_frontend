import React from 'react'
import './../App.css'

export default function Isloading() {
  return (
    <div className='flex w-[24rem] h-[3rem]   justify-around items-center'>
        <div class="loader max-[550px]:ml-[0.7rem]"></div>
        <p className='text-sm font-semibold ml-[-1.5rem] animate-pulse max-[550px]:text-[12px] max-[550px]:ml-[-3rem]'>This may take up to 90 seconds if server is asleep...</p>
    </div>
  )
}
