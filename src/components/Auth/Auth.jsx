import { auth, provider } from '../../firebase-config.js';
import { signInWithPopup } from 'firebase/auth';
import googleLogo from '../../assets/google-logo.png';

import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const Auth = ({ setIsAuth }) => {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch(err) {
      console.error(err);
    }
  };

  return (
    <div className="auth-container
    flex flex-col justify-center items-center 
    h-full min-h-screen
    bg-neutral-800 text-gray-100">
      <p className="text-lg">Sign in with google to continue</p>
      <button 
        className="flex justify-center items-center gap-x-3
        bg-neutral-900 px-4 py-2 mt-4 rounded
        border-2 border-style-solid border-transparent
        active:border-indigo-500
        md:hover:border-indigo-500
        transition-colors select-none"
        onClick={signInWithGoogle}
      >
        <img className="w-4"
          src={googleLogo} 
          alt="google logo" 
        />
        Sign in with Google
      </button>
    </div>
  )
}
