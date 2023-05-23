import React, { useState,useContext } from 'react'
import { Context } from '../context';
import {User} from '../types/user';

type Props = {}

const Form = (props: Props) => {
    const [input,setInput] = useState<string>('');
    const {state} = useContext(Context)

   
    const user: User = state.user ?? {}; 
  
    
    const onSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await fetch('/api/generate', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                input,
                userId: user!.id,
              }),
            });
            console.log(response);
        }catch(error) {
            console.log(error);
        }
    }

    return (
        <div className='p-8'>
            {/** Form */}
            <form onSubmit={onSubmit} className='bg-white border shadow-lg p-28 rounded-xl'>
                <div className='flex flex-col justify-between gap-12'>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter url</label>
                        <input onChange={event=>setInput(event.target.value)} type="text" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required />
                    </div>
                    <button type="submit" className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Form