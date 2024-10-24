import React from 'react'
import { useState } from 'react'
import { useLogin } from './hooks/useLogin'

import Isloading from './components/Isloading';
export default function Login() {
    const {login, error, isLoading} = useLogin(); 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, password)

    }

  return (
    <div className='flex justify-center items-center w-[400px] max-[550px]:w-[330px]'>
    <form 
        action="POST" 
        className='loginContainer w-full h-auto bg-white border-[1px] border-gray-400 rounded-md p-4 flex flex-col justify-center items-center' 
        onSubmit={handleSubmit}
    >
        <div className='w-full mb-2'>
            <h1 className='text-xl mb-4 text-center font-bold'>Login</h1>
        </div>

        <div className="w-full mb-2">
            <label htmlFor="email" className='text-start block mb-1 font-bold'>Email:</label>
            <input 
                type="email" 
                required 
                className="w-full p-2 bg-green-400 h-[2rem] rounded-md text-white"
                onChange={(e) => setEmail(e.target.value)} 
                value={email} 
            />
        </div>

        <div className="w-full mb-2">
            <label htmlFor="password" className='text-start block mb-1 font-bold'>Password:</label>
            <input 
                type="password" 
                required 
                className="w-full p-2 bg-green-400 h-[2rem] rounded-md text-white"
                onChange={(e) => setPassword(e.target.value)} 
                value={password} 
            />
        </div>
        {/* <div className='w-[10rem] h-[3rem] bg-red-300'>
       
            <div class="loader">loading..</div>
        </div> */}
        

            {isLoading ?
           <Isloading/>
            :
            <button
                className="mt-4 text-white px-2 py-1 rounded 
                bg-green-500"
                type='submit'>
                Login
            </button>
            }
        {error && <div className='text-red-500 mt-2'>{error}</div>}
    </form>
</div>

  )
}
