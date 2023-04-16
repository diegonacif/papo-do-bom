import { useState, useRef } from 'react'
import { Auth } from './components/Auth/Auth'

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
      <div className="App ">
        <Auth setIsAuth={setIsAuth} />
      </div>
    )
  }

  return (
    <div className="App 
    flex flex-col justify-center items-center h-full min-h-screen
    bg-neutral-800 text-gray-100
    subpixel-antialiased"> 
      {
        room ? 
        <Chat room={room} /> : 
        <div className="room flex items-center gap-x-4">
          <label className="text-indigo-400 font-bold">Enter Room Name:</label>
          <input ref={roomInputRef} className="w-48 h-8 px-2 text-gray-900 rounded" />
          <button 
            className="bg-gradient-to-br from-indigo-600 to-indigo-900
            px-4 py-2 rounded border-2 border-style-solid border-neutral-800
            hover:border-indigo-500 hover:bg-neutral-800
            transition-colors select-none"
            onClick={() => setRoom(roomInputRef.current.value)}>
            Enter Chat
          </button>
        </div>
      } 

      <div className="sign-out mt-8">
        <button 
          className="bg-gradient-to-br from-indigo-600 to-indigo-900
          px-4 py-2 rounded border-2 border-style-solid border-neutral-800
          hover:border-indigo-500 hover:bg-neutral-800
          transition-colors select-none"
          onClick={signUserOut}
        >
          Sign Out
        </button>
      </div>
    </div>
  )
  
}
