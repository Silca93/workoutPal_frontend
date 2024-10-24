import React from 'react'
import { useState, useEffect } from 'react'

import { useAuthContext } from '../hooks/useAuthContext';

export default function () {

    const {user} = useAuthContext()

    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState(null);

    const [fieldError, setFieldError] = useState(false)


    //submit a new workout
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')

            return 
        }

        if (!title || !load || !reps) {
            setFieldError(!fieldError)
        }

        const workout = {title, load, reps}

        const response = await fetch(
            //?for local development
            // 'http://localhost:4000/api/workouts'

            //!for production
            'https://workoutpal-backend-ukaw.onrender.com/api/workouts/'
            
            , {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        console.log(json);

        if (!response.ok) {
            setError(json.error)
        } else {
            setTitle('');
            setLoad('');
            setReps('');
            setError(null);
            console.log('New workout added', json);

            window.location.reload();
            
        }
        
    }

  
  
  return (
    <div className='flex justify-center items-start max-[800px]:items-center w-full h-full '>
        <form 
            action="POST" 
            onSubmit={handleSubmit} 
            className='formContainer w-full h-auto bg-white rounded-md p-4 flex flex-col justify-center items-center max-[800px]:w-[23rem] max-[800px]:h-[20rem] max-[600px]:w-[18rem] mb-2 mt-2'
        >
            <div className='w-full mb-2'>

            <h1 className='text-xl mb-4 text-start'>ADD A NEW WORKOUT</h1>
            </div>

            <div className="w-full mb-2">
            <label htmlFor="title" className='text-start block mb-1 font-bold'>Exercise title:</label>
            <input 
            required
                type="text" 
                name='title' 
                className="w-full p-2 bg-green-400 h-[2rem] rounded-md text-white"
                onChange={(e) => { setTitle(e.target.value) }}
                value={title} 
            />
            </div>

            <div className="w-full mb-2">
            <label htmlFor="load" className='text-start block mb-1 font-bold'>Load:</label>
            <input 
            required
                type="number" 
                name='load' 
                className={!fieldError ? 'w-full p-2 bg-green-400 h-[2rem] rounded-md text-white' : 'w-full p-2 bg-green-100 h-[2rem] rounded-md text-white border-[2px] border-red-600'  }
                onChange={(e) => { setLoad(e.target.value) }}
                value={load} 
            />
            </div>

            <div className="w-full mb-2">
            <label htmlFor="reps" className='text-start block mb-1 font-bold'>Reps:</label>
            <input 
                type="number" 
                required
                name='reps' 
                className="w-full p-2 bg-green-400 h-[2rem] rounded-md text-white"
                onChange={(e) => { setReps(e.target.value) }}
                value={reps} 
            />
            </div>

            <button type='submit' className="mt-4 bg-green-500 text-white px-2 py-1 rounded">Submit</button>
        </form>
    </div>
  )
}
