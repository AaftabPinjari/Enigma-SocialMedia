import Link from 'next/link'
import { auth } from '../utils/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'


export default function Nav() {
    const [user, loading] = useAuthState(auth);
    return (
        <nav className="flex justify-between items-center gap-10 py-10">
            <Link href="/">
                <button className="text-2xl  font-semibold text-blue-600 md:text-3xl">Enigma</button>
            </Link>
            <ul>
                {!user && (

                    <Link href={"/auth/login"} className="bg-gradient-to-l font-bold text-white from-purple-400 to-purple-200  px-4 
                    py-2 rounded-lg text-sm md:text-md md:text-md ml-8 ">
                        Sign Up
                    </Link>
                )}
                {user && (
                    <div className="flex gap-6 items-center">
                        <Link href={"/post"} className="bg-gradient-to-l font-bold text-white from-purple-400 to-purple-200  px-4 
                        py-2 rounded-lg text-sm md:text-md  ml-8  ">
                            <button>Post</button>
                        </Link>
                        <Link href={"/dashboard"}>
                            <img src={user.photoURL} className="w-12 rounded-full cursor-pointer"></img>
                        </Link>
                    </div>
                )}

            </ul>
        </nav>
    )
}