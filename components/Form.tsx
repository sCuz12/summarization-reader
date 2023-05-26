import React, { useState,useContext, useEffect } from 'react'
import { Context } from '../context';
import {User} from '../types/user';
import { Textarea } from '@mantine/core';

type Props = {}

const Form = (props: Props) => {
    const [url,setUrl] = useState<string>('');
    const [content,setContent] = useState<string>('');
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
                url,
                userId: user!.id,
                content,
              }),
            });
            console.log(response);
        }catch(error) {
            console.log(error);
        }
    }

    return (
        <div className='flex items-center justify-center w-2/4 p-8'>
            {/** Form */}
            <form onSubmit={onSubmit} className='flex w-3/4 p-4 bg-white border shadow-lg rounded-xl'>
                <div className='flex flex-col justify-between w-full gap-12'>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">URL</label>
                        <input onChange={event=>setUrl(event.target.value)} type="text" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required />
                    </div>
                    <div className='flex w-full'>
                        <Textarea
                         placeholder=""
                         label="Post"
                         radius="md"
                         autosize
                         minRows={12}
                         className='w-full'
                         withAsterisk
                         onChange={(e:React.ChangeEvent<HTMLTextAreaElement>)=>setContent(e.currentTarget.value)}
                         >
                            
                        </Textarea>
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