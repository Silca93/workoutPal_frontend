import React from 'react'
import { useEffect, useState } from 'react'
import Form from './components/Form';
import { FaRegTrashAlt } from "react-icons/fa";
import { useAuthContext } from './hooks/useAuthContext';

import formatDistanceToNow from 'date-fns/formatDistanceToNow';


export default function Home() {
    const [workouts, setWorkouts] = useState(null)
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('http://localhost:4000/api/workouts', {
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

    
  return (
    <div className='home w-[60rem] bg-gray-100 h-full flex gap-2 pt-3'> 
    
       <div className="workouts flex flex-col gap-3 pl-3 w-[40rem] bg-[#f3f3f3] overflow-y-scroll pb-3">
        {workouts && workouts.map((item, key) => (
            <div key={key} className='workoutContainer w-[25rem] h-[7rem] bg-white flex flex-col justify-center pl-2 rounded-md relative'>
                <div className="absolute top-0 right-0 hover:bg-red-300 rounded-bl-lg w-[3rem] h-[3rem] flex justify-center items-center">
                    <button className='w-full h-full flex justify-center items-center'
                    onClick={() => handleDelete(item._id)}>
                        <FaRegTrashAlt />
                    </button>
                </div>
                <h2 className='font-bold text-green-600'>{item.title}</h2>
                <p><b>Load: </b> {item.load}</p>
                <p><b>Reps: </b> {item.reps}</p>
                <p>{formatDistanceToNow(new Date(item.createdAt), {addSuffix:true})}</p>
            </div>
         ))}
       </div>
       <div className="form w-[20rem] flex flex-col items-end mr-3">
         <Form/>
       </div>
       
    </div>
  )
}
