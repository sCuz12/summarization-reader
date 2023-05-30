import React, { useState, useContext, useEffect, useRef } from 'react'
import { Context } from '../context';
import { User } from '../types/user';
import { Alert, Group, Loader, NativeSelect, Text, TextInput, Textarea } from '@mantine/core';
import SucessMessage from './MessagesBox/SucessMessage';
import validator from 'validator';
import axios from 'axios';
import { Select } from '@mantine/core';


type Props = {
    openOverlay: React.Dispatch<React.SetStateAction<boolean>>;
}

interface VoicesResponse {
    voice_id : string ,
    name : string,
    preview_url : string,
}

interface VoiceItem {
    label : string,
    value : string,
    preview_url : string,
}

const Form = ({ openOverlay }: Props) => {
    const [url, setUrl] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState(false);
    const [urlErrorMessage, setUrlErrorMessage] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [voices , setVoices] =  useState([]);
    const [selectedVoiceId , setSelectedVoiceId] = useState('');
    const audioRef = useRef<HTMLAudioElement>(null);
    
    const { state } = useContext(Context)

    const user: User = state.user ?? {};

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
            ;
        setSubmitLoading(true)
        openOverlay(true)

        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                url,
                userId: user!.id,
                content,
                voiceId : selectedVoiceId
            })
        })
            .then((response) => {
                console.log("Done With generation ")
                clearForm()
                openOverlay(false);
                setSuccessMessage(true)
                setSubmitLoading(false)
            }).catch((error) => {
                console.log(error)
                console.log(error);
            });
    }

    const urlChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(e.target.value)
    }

    //Note : Clear the data of form
    const clearForm = (): void => {
        setUrl('');
        setContent('');
    }

  
    //Get voices from eleven las
    useEffect(() => {
        const getVoices = async () => {
          try {
            const baseUrl = "https://api.elevenlabs.io";
            const apiKey = process.env.NEXT_PUBLIC_ELEVENLABS_API; // Replace with your actual OpenAI API key
            
            const headers = {
              'Content-Type': 'application/json',
              'x-api-key': apiKey, // Replace with your actual x-api-key value
            };
      
            const response = await axios.get(baseUrl + '/v1/voices', { headers });
            const transformedData = response.data.voices.map((item :VoicesResponse) => ({
                value: item.voice_id,
                label: item.name,
                preview_url : item.preview_url
            }))

            return transformedData;
          } catch (error) {
            console.error(error);
          }
        };
      
        const fetchData = async () => {
          const voices = await getVoices();
          setVoices(voices)
        };
      
        fetchData();
      }, []);

    //validate URL
    useEffect(() => {
        const urlPattern = /^(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}(\.[a-zA-Z]{2})?$/;
        // Check if the URL matches the desired format
        if (!validator.isURL(url) && url !== '') {
            setUrlErrorMessage(true);
        } else {
            setUrlErrorMessage(false)
        }
    }, [url])


    //** Handlers */
    const handleVoiceSelect = (e:any) => {
        const voiceValue = e.currentTarget.value;
        //update selected voice
        setSelectedVoiceId(voiceValue)
        //get the whole item
        const matchItem:any = voices.find((item:VoiceItem)=>item.value === voiceValue)
        //play 
        if(matchItem && matchItem.preview_url){
            audioRef.current?.setAttribute('src',matchItem.preview_url)
            audioRef.current?.play();
        }
        
    }

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
                    <div className='flex flex-col w-full'>
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
                        
                        <NativeSelect
                        label="Voice"
                        placeholder="Pick one"
                        data={voices}
                        onChange={handleVoiceSelect}
                        />
                    </div>
                    <button type="submit" className="px-4 py-2 font-bold text-white bg-blue-500 rounded disabled:opacity-20 hover:bg-blue-700" disabled={submitLoading}>
                        {submitLoading ? (
                            <div className='flex items-center justify-center w-full'>
                                <Loader />
                            </div>

                        ) : (
                            <p>Submit</p>
                        )}
                    </button>
                    {successMessage && (
                        <SucessMessage fullDiv={true} message='Summarization Succesfully Generated'>

                        </SucessMessage>
                    )}

                </div>
                <audio hidden ref={audioRef} controls />
            </form>
        </div>
    )
}

export default Form