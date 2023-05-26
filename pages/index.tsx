import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Form from '../components/Form'
import withAuth from './hoc/withAuth'
import { ContentData } from '../types/user'
import { use, useEffect, useState } from 'react'
import { User } from '../types/user'
import PlayerCard from '../components/Cards/PlayerCard'

interface HomeProps {
  userID: string,
}

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

const Home: NextPage = () => {
  const [userID, setUserID] = useState<string>('');
  const [content, setContent] = useState<ContentData[] | null>(null);

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
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a>Readitforme</a>
        </h1>

        <Form />

        <div className='py-8'>
          <div className='grid grid-cols-1 gap-4'>
          {content && (
            content.map((item,index) => (
              <PlayerCard data = {item} key={index}/>
            ))
          )}
          </div>
         
        </div>

      </main>
    </div>
  )
}

export default withAuth(Home)
