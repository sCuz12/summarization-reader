import React, { useEffect, useState } from 'react'
import SucessMessage from '../../components/MessagesBox/SucessMessage';
import { useRouter } from 'next/router';
import ErrorMessage from '../../components/MessagesBox/ErrorMessage';

type Props = {}

const Register = (props: Props) => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [successMessage, setSuccessMessage] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');


  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log("sending request");
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.status == 200) {
        setSuccessMessage(true);
        setTimeout(() => {
          router.push("/auth/login");
        }, 400)
      } else {
        const errorMessage = data.message;
        setErrorMessage(errorMessage);
      }

    } catch (error) {
      console.log(error);
    }
  }


  /*=============HANDLERS============== */
  const emailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value)
    setPasswordMatch(event.target.value === password);
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
    setPasswordMatch(event.target.value === confirmPassword);
  }

  useEffect(() => {
    // Enable the submit button if both email and password are not empty
    if (email && password && confirmPassword) {
      setDisableSubmit(false);
    } else {
      setDisableSubmit(true);
    }
  }, [email, password, confirmPassword]);

  return (
    <div className='p-12'>
      <div className='flex items-center justify-center '>
        <div className='flex flex-col items-center gap-4 '>
          <p className='text-5xl'>Read it aloud</p>
          <p className='font-bold '>Read it aloud </p>
        </div>
      </div>
      <form onSubmit={onSubmitHandler}>
        <div className='p-8'>
          <div className='mb-8'>
            <label className="block mb-2 text-sm font-medium">Your Email</label>
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
              </div>
              <input onChange={emailChangeHandler} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" />
            </div>
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium">Password</label>
            <input onChange={handlePasswordChange} type="password" className="border text-sm rounded-lg block w-full p-2.5" />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium">Confirm password</label>
            <input onChange={handleConfirmPasswordChange} type="password" className="border text-sm rounded-lg block w-full p-2.5" />
          </div>
          {successMessage && (
            <div className='flex items-center justify-center w-full'>
              <SucessMessage message='Register Succesfully' />
            </div>
          )}
          {!passwordMatch && (
            <ErrorMessage message='Passwords do not match' />
          )}

          {errorMessage && (
            <ErrorMessage message={errorMessage}/>
          )}

        </div>
        <div className='flex items-center justify-center'>
          <button type='submit' disabled={disableSubmit} className="px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 disabled:opacity-25">
            Submit
          </button>
        </div>

      </form>
    </div>
  )
}
export default Register