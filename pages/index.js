import Head from 'next/head'
import Image from 'next/image'
import Message from '../components/Message'
import { useEffect, useState } from 'react';
import { db } from '../utils/firebase';
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';

export default function Home() {
  const [allPosts, setAllPosts] = useState([]);
  const getPost = async () => {
    const collectionRef = collection(db, 'posts');
    const q = query(collectionRef, orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAllPosts(snapshot.docs.map((doc) => ({
        ...doc.data(), id: doc.id
      })))
    })
    return unsubscribe;
  }
  console.log(allPosts);
  useEffect(() => {
    getPost();
  }, [])

  return (
    <div >
      <Head>
        <title>Enigma</title>
        <meta name="Enigma" content="A social media app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main >
        <div className=" my-12 ">
          <h1 className="text-center font-bold text-blue-500 text-lg">Conversations</h1>
          {allPosts.map(post => (
            <Message {...post} key={post.id}></Message>
          ))}
        </div>
      </main>
    </div>
  )
}
