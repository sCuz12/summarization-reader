import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react'
import { Context } from "../../context/index";
import SucessMessage from '../../components/MessagesBox/SucessMessage';
import ErrorMessage from '../../components/MessagesBox/ErrorMessage';

type Props = {}

const Login = (props: Props) => {

    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [disableSubmit, setDisableSubmit] = useState(true);
    const [successMessage, setSuccessMessage] = useState(false);
    const [errorMessage,setErrorMessage] =  useState('')

    const {dispatch} = useContext(Context);

    const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setSuccessMessage(false)
            setErrorMessage('');
            
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
        
            if(response.status == 200) {
                const { user, token } = data;
                //append token
                user.token = token

                // Update the user and token in the context
                dispatch({ type: "LOGIN", payload: user });
                //save token to local storage
                localStorage.setItem("user", JSON.stringify(user));
                
                setSuccessMessage(true);
                setTimeout(() => {
                    router.push("/");
                }, 400)
            } else {
                console.log(data)
                setErrorMessage(data.message);
            }
     
        } catch (error:any) {
            setErrorMessage("Error occured")
            console.log(error);
        }
    }


    useEffect(() => {
        // Enable the submit button if both email and password are not empty
        if (email && password) {
            setDisableSubmit(false);
        } else {
            setDisableSubmit(true);
        }
    }, [email, password]);

    return (
        <div className='p-12'>
            <div className='flex w-full'>
                <p>Illustration part</p>
            </div>

            <div className='flex items-center justify-center w-full'>
                <p className='items-center justify-center text-6xl font-bold'>Login</p>
            </div>

            <div className='flex items-center justify-center w-full p-20'>
                <form onSubmit={formSubmitHandler} className='flex flex-col items-center justify-center w-full'>
                    <div className='flex flex-col items-center w-full gap-2'>
                        <div className='flex flex-col w-1/2'>
                            <label className="block mb-2 font-medium text-gray-900 text-md dark:text-white">Username</label>
                            <input defaultValue="georgehadjisavvas12@gmail.com" onChange={(e) => setEmail(e.target.value)} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
                        </div>
                        <div className='flex flex-col w-1/2'>
                            <label className="block mb-2 font-medium text-gray-900 text-dm dark:text-white">Password</label>
                            <input onChange={(e) => setPassword(e.target.value)} type="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>
                    </div>

                    <div className='flex w-full pt-8'>
                        <div className='flex items-center justify-center w-full'>
                            <button type='submit' disabled={disableSubmit} className="px-12 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 disabled:opacity-25">
                                Login
                            </button>
                        </div>
                    </div>
                    <div className='flex flex-col w-full p-8'>
                        {successMessage && (
                            <div className='flex items-center justify-center w-full'>
                                <SucessMessage message='Login Succesfully' />
                            </div>

                        )}
                           {errorMessage && (
                            <div className='flex items-center justify-center w-full'>
                                <ErrorMessage message= {errorMessage} />
                            </div>

                        )}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login