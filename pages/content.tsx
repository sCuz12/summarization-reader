import React, { useEffect, useState } from 'react'
import { ContentData, User } from '../types/user';
import withAuth from './hoc/withAuth'
import PlayerCard from '../components/Cards/PlayerCard';

type Props = {}

const Content = (props: Props) => {
    const [userID, setUserID] = useState<string>('');
    const [content, setContent] = useState<ContentData[] | null>(null);

    const fetchContent = async (userID: string): Promise<ContentData[]> => {
        try {
            // Fetch content based on the userID
            const response = await fetch(`/api/user/content_generated`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userID: userID }),
            })
            const responseData: ContentData[] = await response.json();
            return responseData

        } catch (error) {
            console.error(error);
            throw new Error('Failed to fetch content');
        }
    };

    useEffect(() => {
        const user: User = JSON.parse(localStorage.getItem('user')!);

        if (user) {
            setUserID(user.id);
        }
    }, []);

    useEffect(() => {
        if (userID) {
          fetchContent(userID)
            .then((data) => {
              setContent(data)
            })
            .catch((error) => {
              console.error(error);
            });
        }
      }, [userID]);
    

    return (
        <div>
            <div className='py-8'>
                <div className='grid grid-cols-4 gap-4'>
                    {content && (
                        content.map((item, index) => (
                            <PlayerCard data={item} key={index} />
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default withAuth(Content)