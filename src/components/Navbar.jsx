import React from 'react'
import { Link } from 'react-router-dom'
import { GiWeightLiftingUp } from "react-icons/gi";
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

import { IoMdLogOut } from "react-icons/io";
import { IoMdLogIn } from "react-icons/io";




export default function Navbar() {
  const {user} = useAuthContext()

  const { logout } = useLogout();

  const handleLogout = () => {
    logout()

  }
  return (
    <div className='bg-green-600 pl-[10rem] max-[950px]:pl-0 w-full h-[8%] border-b-2 border-green-500 '>
        <header className='w-full h-full flex gap-3 justify-between '>
            <div className="container w-[30%]  pl-2   gap-3 h-full flex justify-center items-center max-[950px]:w-[20rem] max-[650px]:w-[25rem] max-[950px]:justify-start">
              <div className="bubble w-[3rem] h-[3rem] bg-white rounded-full flex justify-center items-center">
                <GiWeightLiftingUp className='text-3xl'/>
              </div>
                <Link to="/">
                    <h1 className='font-bold text-3xl text-white max-[950px]:text-xl'>Workout Pal</h1>
                </Link>
            </div>
            <div className='navContainer w-[18rem] max-[650px]:w-[22rem] h-full bg-white flex justify-center items-center'>
              <nav className='flex gap-4'>
                {user ?  
                  <div className="flex gap-2 justify-center items-center pr-1">
                    <span className='text-green-700 font-semibold max-[600px]:text-[12px] pl-2'>{user.email.length > 20 ? user.email.slice(0, 20) + '...' : user.email}
                    </span>
                    <span className="font-extralight">|</span>
                    <div className="flex gap-1 justify-center items-center ring-1 ring-red-500 p-1 rounded-lg">
                      <button className="text-sm font-semibold" onClick={handleLogout}>Logout</button>
                      <IoMdLogOut  className='text-red-600'/>
                    </div>
                  </div>
                  : 
                  <div className='flex gap-4 justify-center items-center'>
                        <Link to="/login">
                          <div className="flex gap-1 justify-center items-center ring-1 ring-green-500 p-1 rounded-lg">
                                <IoMdLogIn className='text-green-600'/>
                                <button className="font-semibold max-[600px]:text-[12px] " onClick={handleLogout}>Login</button>
                          </div>
                        </Link>
                        <span className="font-extralight">|</span>

                    <Link to="/signup" className="font-semibold max-[600px]:text-[12px] ">Signup</Link>
                  </div>
                }
              </nav>
            </div>
        </header>
    </div>
  )
}
