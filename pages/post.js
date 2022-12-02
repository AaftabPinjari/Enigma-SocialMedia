import { auth, db } from '../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify'

export default function post() {
    const [post, setPost] = useState({ description: "" })
    const [user, loading] = useAuthState(auth);
    const route = useRouter();
    const routeData = route.query;

    //submit post
    const submitPost = async (e) => {
        e.preventDefault();
        if (!post.description) {
            toast.error("Field is empty !",
                {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1000,
                });
            return;
        }
        if (post.description.length > 300) {
            toast.error("Descritpion too long !",
                {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1000,
                });
        }
        if (post.hasOwnProperty('id')) {
            const docRef = doc(db, "posts", post.id);
            const updatedPost = { ...post, timestamp: serverTimestamp() };
            await updateDoc(docRef, updatedPost);
            return route.push("/");
        } else {

            const collectionRef = collection(db, "posts");
            await addDoc(collectionRef, {
                ...post,
                timestamp: serverTimestamp(),
                user: user.uid,
                avatar: user.photoURL,
                username: user.displayName,
            });
            setPost({ description: '' });
            toast.success("Successfully Posted the Enigma!!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1000,
            })
            return route.push("/");
        }
    }
    //check the route if new post or edit post is
    const checkUser = async () => {
        if (loading) return;
        if (!user) route.push("/auth/login");
        if (routeData.id) {
            setPost({ description: routeData.description, id: routeData.id });
        }
    }
    useEffect(() => {
        checkUser();
    }, [user, loading])


    return (
        <div className="shadow-xl p-12 rounded-lg  
        flex flex-col my-10 justify-between  ">
            <form className="py-2" onSubmit={submitPost}>
                <h1 className="font-medium text-blue-500 text-2xl" >
                    {post.hasOwnProperty('id') ? "Edit your Post" : "Create New Post"}
                </h1>
                <div>
                    <h3 className="text-lg text-blue-500 font-medium py-2">Description</h3>
                    <textarea
                        value={post.description}
                        onChange={(e) => setPost({ ...post, description: e.target.value })}
                        className="bg-gray-200 h-48 
                    w-full rounded-lg  p-2"/>
                    <p
                        className={`text-blue-500 font-medium text-sm
                         ${post.description.length > 300 ? "text-red-600" : ""}`}
                    >{post.description.length}/300</p>
                </div>
                <button
                    type="submit"
                    className="w-full text-white font-bold rounded-lg font-medium py-2 my-2 bg-gradient-to-l from-purple-400 to-purple-200 ">Post</button>
            </form>
        </div>
    )
}