import React, { useState, useContext, useEffect } from 'react'
import { Context } from '../context';
import { User } from '../types/user';
import { Alert, TextInput, Textarea } from '@mantine/core';
import SucessMessage from './MessagesBox/SucessMessage';
import validator from 'validator';

type Props = {
    openOverlay: React.Dispatch<React.SetStateAction<boolean>>;
}

const Form = ({ openOverlay }: Props) => {
    const [url, setUrl] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState(false);
    const [urlErrorMessage, setUrlErrorMessage] = useState(false);

    const { state } = useContext(Context)

    const user: User = state.user ?? {};

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        openOverlay(true);

        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                url,
                userId: user!.id,
                content,
            })
        })
            .then((response) => {
                console.log("Done With generation ")
                openOverlay(false);
                setSuccessMessage(true)
            }).catch((error) => {
                console.log(error)
                console.log(error);
            });
    }

    const urlChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(e.target.value)
    }

    useEffect(() => {
        const urlPattern = /^(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}(\.[a-zA-Z]{2})?$/;
        // Check if the URL matches the desired format
        if (!validator.isURL(url) && url !== '') {
            setUrlErrorMessage(true);
        } else {
            setUrlErrorMessage(false)
        }
    }, [url])

    return (
        <div className='flex items-center justify-center w-2/4 p-8'>
            {/** Form */}
            <form onSubmit={onSubmit} className='flex w-3/4 p-4 bg-white border shadow-lg rounded-xl'>
                <div className='flex flex-col justify-between w-full gap-12'>
                    <div>
                        {urlErrorMessage === true && (
                            <Alert color="red">
                                Not valid URL Format
                            </Alert>
                        )}
                          <TextInput
                            onChange={urlChangeHandler} 
                            label="Blog URL"
                            withAsterisk
                            />
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
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.currentTarget.value)}
                        >

                        </Textarea>
                    </div>
                    <button type="submit" className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
                        Submit
                    </button>
                    {successMessage && (
                        <SucessMessage fullDiv={true} message='Summarization Succesfully Generated'>

                        </SucessMessage>
                    )}

                </div>
            </form>
        </div>
    )
}

export default Form