import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '../../utils/firebase';
import { useRouter } from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from 'react';


export default function Login() {
    const route = useRouter();
    const googleProvider = new GoogleAuthProvider();
    const [user, loading] = useAuthState(auth);
    const GoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            route.push("/")
            // console.log(result);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (user) {
            route.push("/");
        } else {
            console.log("error");
        }
    }, [user])

    return (
        <div className="shadow-xl p-5 rounded-lg  
        flex flex-col mt-100 justify-between items-center mt-32
        bg-gray-200 ">
            <h2 className=" text-blue-600 text-xl font-medium ">Sign Up Now!</h2>
            <div className="flex flex-col gap-5 mt-10">
                <h3 className="text-lg text-blue-500">Click Below to Sign Up</h3>
                <button onClick={GoogleLogin} className="border rounded-lg  shadow-md py-1 px-4  bg-gradient-to-l font-bold  from-purple-400 to-purple-200">
                    <span className="font-bold text-xl ">G</span>  SignUp with Google</button>
            </div>
        </div>
    );
}