import React from 'react'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react'
import Form from './components/Form';
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";

import { useAuthContext } from './hooks/useAuthContext';

import formatDistanceToNow from 'date-fns/formatDistanceToNow';


export default function Home() {
    const [workouts, setWorkouts] = useState(null)
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch(

                //?for local development
                // 'http://localhost:4000/api/workouts'

                //!for production
                'https://workoutpal-backend-ukaw.onrender.com/api/workouts/'
                , {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            console.log(user.token);
            
    
            if (response.ok) {
                setWorkouts(json)
                console.log(workouts);
                
            } else {
                console.log("error fetching workouts", json.error);
                
            }
    
        }
        if (user) {
            fetchWorkouts()
        }

    }, [user] );


//delete a workout
    const handleDelete = async (id) => {
        if (!user) {
            return 
        }
        const response = await fetch(
            //?for local development
            // 'http://localhost:4000/api/workouts/'

            //!for production 
            'https://workoutpal-backend-ukaw.onrender.com/api/workouts/'

            + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()
        console.log(json);
        
        if (!response.ok) {
            console.log(json.error);
            
        } else {

            setWorkouts(workouts.filter((item) => item._id !== id))
            // window.location.reload();
        }

    }

//update a workout
return (
    <div className='home w-[60rem] max-[960px]:w-[50rem] bg-gray-100 h-full flex gap-2 pt-3 max-[800px]:flex-col '> 
       <div className="workouts flex flex-col gap-3 pl-3 w-[40rem] bg-[#f3f3f3] overflow-y-scroll pb-3 max-[800px]:w-full max-[800px]:items-center">
        {workouts && workouts.map((item, key) => (
            <div key={key} className='workoutContainer w-[25rem] max-[650px]:w-[20rem] h-[7rem] bg-white flex flex-col justify-center pl-2 rounded-md relative'>
                <div className="absolute top-0 right-0 hover:bg-red-300 rounded-bl-lg w-[3rem] h-[3rem] flex justify-center items-center">
                    <button className='w-full h-full flex justify-center items-center'
                    onClick={() => handleDelete(item._id)}>
                        <FaRegTrashAlt />
                    </button>
                </div>
                <div className="absolute bottom-2 right-2">
                    <Link to={`/update/${item._id}`}>
                        <button className='w-[1.8rem] h-[1.8rem] bg-orange-200 rounded-full flex justify-center items-center'>
                        <MdOutlineEdit  className='text-black hover:text-white'/>
                        </button>
                    </Link>
                </div>
                <h2 className='font-bold text-green-600'>{item.title}</h2>
                <p><b>Load: </b> <span className='font-semibold text-gray-500'> {item.load}</span></p>
                <p><b>Reps: </b> <span className='font-semibold text-gray-500'> {item.reps}</span></p>
                <p>{formatDistanceToNow(new Date(item.createdAt), {addSuffix:true})}</p>
            </div>
         ))}
       </div>
       <div className="form w-[20rem] flex flex-col items-end mr-3 max-[800px]:items-center  max-[800px]:w-full max-[800px]:justify-center max-[800px]:bg-zinc-200">
         <Form/>
       </div>
       
    </div>
  )
}
