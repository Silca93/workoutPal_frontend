import React from 'react'
import './../App.css'

export default function Isloading() {
  return (
    <div className='flex w-[24rem] h-[3rem]   justify-around items-center'>
        <div class="loader"></div>
        <p className='text-sm font-semibold   ml-[-2rem]'>This may take up to a minute if server is asleep...</p>
    </div>
  )
}
