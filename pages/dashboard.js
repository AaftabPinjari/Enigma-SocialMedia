import { auth } from '../utils/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from "next/router"
import { useEffect, useState } from 'react';
import { db } from '../utils/firebase';
import { collection, onSnapshot, deleteDoc, doc, orderBy, query, where } from 'firebase/firestore';
import Message from '../components/Message';
import Link from 'next/link';


export default function dashboard() {
    const route = useRouter();
    const [user, loading] = useAuthState(auth);
    const [posts, setPosts] = useState([]);

    const getData = async () => {
        if (loading) return;
        if (!user) return route.push("/auth/login");
        const collectionRef = collection(db, 'posts');
        const q = query(collectionRef, where("user", "==", user.uid));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setPosts(snapshot.docs.map((doc) => ({
                ...doc.data(), id: doc.id
            })))
        })
        return unsubscribe;
    }

    //delete post
    const deletePost = async (id) => {
        const docRef = doc(db, 'posts', id);
        await deleteDoc(docRef);
    }

    useEffect(() => {
        getData();
    }, [user, loading])

    return (
        <div>
            <h1 className="text-center font-bold text-blue-500 text-lg">Your Posts</h1>
            <div>{posts.map(post => {
                return (
                    <Message {...post} key={post.id}>
                        <div className="flex justify-around mt-2">
                            <button
                                onClick={() => deletePost(post.id)}
                                className="bg-gradient-to-l font-bold text-white from-purple-400 to-purple-200  px-4 
                            py-2 rounded-lg text-sm md:text-md  ml-8  ">Delete</button>
                            <Link href={{ pathname: "/post", query: post }}>
                                <button className="bg-gradient-to-l font-bold text-white from-purple-400 to-purple-200  px-4 
                            py-2 rounded-lg text-sm md:text-md  ml-8  ">Edit</button>
                            </Link>
                        </div>
                    </Message>)
            })}</div>
            <div className="text-center">
                <button onClick={() => auth.signOut()}
                    className="bg-gradient-to-l font-bold text-white from-purple-400 to-purple-200  px-4 
                            py-2 rounded-lg text-sm md:text-md  ml-8  " >Sign out</button>
            </div>
        </div>
    )
}