import React, { useRef, useState, useEffect } from 'react'
import { FaRegPlayCircle, FaPauseCircle } from 'react-icons/fa'

type Props = {
    title: string,
    audio_url: string,
    index: number,
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
                <audio ref={audioRef} src={props.audio_url} onEnded={e => { setIspaused(true) }}>

                </audio>
            </div>
            <div className='flex flex-col items-center gap-4'>
                <div className='flex justify-center w-full'>{props.title}</div>
                {isPaused ? (
                    <FaRegPlayCircle onClick={e => setIspaused(!isPaused)} size={40} />
                ) : (
                    <FaPauseCircle onClick={e => setIspaused(!isPaused)} size={40} />
                )
                }
            </div>


        </div>

    )
}

export default PlayerCard