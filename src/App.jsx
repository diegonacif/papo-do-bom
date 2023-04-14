import { useState, useRef } from 'react'
import { Auth } from './components/Auth/Auth'
import './App.css'

import Cookies from 'universal-cookie';
import { Chat } from './components/Chat/Chat';
const cookies = new Cookies();

export const App = () => {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState("");

  const roomInputRef = useRef(null);

  if(!isAuth) {
    return (
      <div className="App">
        <Auth setIsAuth={setIsAuth} />
      </div>
    )
  }

  return (
    <div> 
      {
        room ? 
        <Chat room={room} /> : 
        <div className="room">
          <label htmlFor="">Enter Room Name:</label>
          <input ref={roomInputRef} />
          <button onClick={() => setRoom(roomInputRef.current.value)}>
            Enter Chat
          </button>
        </div>
      } 
    </div>
  )
  
}
