import React from 'react'
import { useState } from 'react'
import { useSignup } from './hooks/useSignup'
import Isloading from './components/Isloading'

export default function Signup() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {signup, error, isLoading} = useSignup()


    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(email,password)

        console.log(email, password);
        

    }

  return (
    <div className='flex justify-center items-center w-[400px] max-[550px]:w-[330px]'>
    <form 
        className='signupContainer w-full h-auto bg-white rounded-md p-4 flex flex-col border-[1px] border-gray-400 justify-center items-center' 
        onSubmit={handleSubmit}
    >
        <div className='w-full mb-2'>
            <h1 className='text-xl mb-4 text-center font-bold'>Sign up</h1>
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
        {isLoading?
        <Isloading/>
        :
        <button 
            disabled={isLoading} 
            className="mt-4 bg-green-500 text-white px-2 py-1 rounded" 
            type='submit'
        >
            Sign up
        </button>
        }
        {error && <div className='text-red-500 mt-2'>{error}</div>}
    </form>
</div>

  )
}
