import React, { useRef, useState, useEffect } from 'react'
import { FaRegPlayCircle, FaPauseCircle } from 'react-icons/fa'
import { ContentData } from '../../types/user'
import { Badge, Card, Group, Text, Image, Divider, Center } from '@mantine/core'
import FullItemImageExpand from './FullItemImageExpand';

type Props = {
    data: ContentData
}


const PlayerCard = (props: Props) => {
    const [isPaused, setIspaused] = useState(true)
    const audioRef = useRef<HTMLAudioElement>(null);
    const [showFullImage, setshowFullImage] = useState(false);

    useEffect(() => {
        if (audioRef.current) {
            if (isPaused) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
        }
    }, [isPaused]);

    const handleImageClicked = (event: any, value: boolean): void => {
        event.stopPropagation();
        setshowFullImage(value);
    };


    return (
        <Card shadow={'xl'} pt={0} pb={'md'} radius={20} withBorder className='max-w-[400px] relative' >
            <div>
                <audio ref={audioRef} src={props.data.audio_url} onEnded={e => { setIspaused(true) }}>
                </audio>
            </div>

            <Card.Section>
                {props.data.image && props.data.title && (
                    <Image alt={props.data.title} src={props.data.image} height={100} />
                )}
            </Card.Section>

            <Group position="apart" mt="md" mb="xs">
                <Text weight={500}>{props.data.title}</Text>
                <Badge color='pink' variant='light'>
                    {props.data.source}
                </Badge>
            </Group>

            <Group mt="md">
                <Text size="sm" color="dimmed">
                    <div className='flex'>
                        <div className='flex w-3/5'>
                            {props.data.content?.substring(0, 70) + "..."}
                        </div>
                        <div className='flex justify-center w-2/5'>
                            {isPaused ? (
                                <FaRegPlayCircle onClick={e => setIspaused(!isPaused)} size={40} />
                            ) : (
                                <FaPauseCircle onClick={e => setIspaused(!isPaused)} size={40} />
                            )
                            }
                        </div>
                    </div>
                </Text>
            </Group>

        </Card>

    )
}

export default PlayerCard