import { useState, useRef } from 'react'
import { Auth } from './components/Auth/Auth'
import './App.css'

import Cookies from 'universal-cookie';
import { Chat } from './components/Chat/Chat';

import { signOut } from 'firebase/auth'
import { auth } from './firebase-config'

const cookies = new Cookies();

export const App = () => {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState("");

  const roomInputRef = useRef(null);

  const signUserOut = async () => {
    await signOut(auth)
    cookies.remove("auth-token")
    setIsAuth(false)
    setRoom(null)
  }

  if(!isAuth) {
    return (
      <div className="App">
        <Auth setIsAuth={setIsAuth} />
      </div>
    )
  }

  return (
    <> 
      {
        room ? 
        <Chat room={room} /> : 
        <div className="room">
          <label className="text-indigo-800 font-bold">Enter Room Name:</label>
          <input ref={roomInputRef} />
          <button onClick={() => setRoom(roomInputRef.current.value)}>
            Enter Chat
          </button>
        </div>
      } 

      <div className="sign-out">
        <button onClick={signUserOut}>Sign Out</button>
      </div>
    </>
  )
  
}
