import { auth, provider } from '../../firebase-config.js';
import { signInWithPopup } from 'firebase/auth';

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
    <div className="auth-container">
      <p>Sign in with google to continue</p>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  )
}
