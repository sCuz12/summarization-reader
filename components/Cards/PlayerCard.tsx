import Image from 'next/image'
import React, { useRef, useState, useEffect } from 'react'
import { FaRegPlayCircle, FaPauseCircle } from 'react-icons/fa'
import { ContentData } from '../../types/user'

type Props = {
    data: ContentData
}


const PlayerCard = (props: Props) => {
    const [isPaused, setIspaused] = useState(true)
    const audioRef = useRef<HTMLAudioElement>(null)

    useEffect(() => {
        if (audioRef.current) {
            if (isPaused) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
        }
    }, [isPaused]);

    return (
        <div className='rounded bg-slate-200 w-80 h-28 rounded-xl'>
            <div>
                <audio ref={audioRef} src={props.data.audio_url} onEnded={e => { setIspaused(true) }}>

                </audio>
            </div>
            <div className='flex flex-col items-center gap-4'>
                <div className='flex justify-center w-full pt-4 font-bold'>{props.data.title}</div>
                <div className='flex w-full'>
                    {props.data.image && (
                        <div className='flex w-1/4 pl-8'>
                            <Image src={props.data.image!} alt={props.data.title!} width={120} height={120} />
                        </div>
                    )}

                    <div className='flex justify-end w-3/4'>
                        {isPaused ? (
                            <FaRegPlayCircle onClick={e => setIspaused(!isPaused)} size={40} />
                        ) : (
                            <FaPauseCircle onClick={e => setIspaused(!isPaused)} size={40} />
                        )
                        }
                    </div>

                </div>

            </div>


        </div>

    )
}

export default PlayerCard