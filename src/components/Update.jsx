import React from 'react'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { useAuthContext } from '../hooks/useAuthContext';
import { useParams } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";



export default function Update () {

    const { id } = useParams();
    const {user} = useAuthContext()

    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState(null);
    const [fieldError, setFieldError] = useState(false)


    useEffect(() => {
        const fetchWorkout = async () => {
          if (!user) return;
    
          const response = await fetch(
            //?for local dev
            // 'http://localhost:4000/api/workouts/'

            //!for production//
            'https://workoutpal-backend-ukaw.onrender.com/api/workouts/'
            + id, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`,
            },
          });
    
          const json = await response.json();
          if (response.ok) {
            setTitle(json.title);
            setLoad(json.load);
            setReps(json.reps);
          } else {
            setError(json.error);
          }
        };
    
        if (id) {
            fetchWorkout();
            }
        }, [id, user]);


    //update a new workout
    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!user) {
         return  console.log('user not logged in');
            
        }


        const workout = {title, load, reps}
            
        
        const response = await fetch(
            //?for local development
            // 'http://localhost:4000/api/workouts/'

            //!for production
            'https://workoutpal-backend-ukaw.onrender.com/api/workouts/'
            
            + id , {
            method: 'PATCH',
            body: JSON.stringify(workout),
            headers : {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (!response.ok) {

            setError(json.error);

        } else {
            setTitle('');
            setLoad('');
            setReps('');
            console.log('Workout updated', json);

            window.location.reload();
        }
    }

return (
    <div className='flex flex-col justify-center items-center w-[400px] max-[550px]:w-[330Px] '>
        <div className='w-full h-[3rem] '>
            <Link to="/">
            <div className="backButton flex gap-1 w-[5rem] h-[2rem] ring-1 ring-slate-300 bg-white  rounded lg justify-center items-center">
                <IoMdArrowRoundBack />
                <h2>Back</h2>
            </div>
            </Link>
        </div>

        <form 
            onSubmit={handleUpdate} 
            className='formContainer w-full h-auto border-gray-400 bg-white rounded-md p-4 flex flex-col justify-center items-center'
        >
            <div className='w-full mb-2'>

            <h1 className='text-xl mb-4 text-start'>UPDATE WORKOUT</h1>
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
