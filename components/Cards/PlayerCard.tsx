import React, { useState } from 'react'
import { FaRegPlayCircle, FaPauseCircle } from 'react-icons/fa'

type Props = {
    title: string,
    audio_url: string,
}


const PlayerCard = (props: Props) => {
    const [isPaused, setIspaused] = useState(true)

    return (
        <div className='rounded bg-slate-200 w-80 h-28 rounded-xl'>
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