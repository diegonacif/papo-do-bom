import { useState, useRef } from 'react'
import { useSessionStorage } from 'usehooks-ts'
import { Auth } from './components/Auth/Auth'

import Cookies from 'universal-cookie';
import { Chat } from './components/Chat/Chat';

import { signOut } from 'firebase/auth'
import { auth } from './firebase-config'

import logo from './assets/papo-logo.png';
import { DoorOpen, SignOut } from '@phosphor-icons/react';

const cookies = new Cookies();

export const App = () => {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useSessionStorage("current-room", "");

  console.log(room)

  const roomInputRef = useRef(null);

  const signUserOut = async () => {
    await signOut(auth)
    cookies.remove("auth-token")
    setIsAuth(false)
    setRoom(null)
  }

  const handleExitRoom = () => {
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
    flex flex-col items-center h-screen
    bg-neutral-800 text-gray-100
    subpixel-antialiased box-border"> 
      {
        room ? 
        <>
          <div className="header 
            flex justify-between items-center w-full px-4 py-2
            bg-gradient-to-bl from-indigo-600"
          >
            <h1 className="text-2xl font-bold">{room.toUpperCase()}</h1>
            <div className="sign-out">
              <button 
                className="bg-gradient-to-br from-indigo-600 to-indigo-900
                font-medium
                px-4 py-2 rounded border-2 border-style-solid border-neutral-800
                active:hover:border-indigo-500
                md:hover:border-indigo-500
                transition-colors select-none"
                onClick={handleExitRoom}
              >
                Sair
              </button>
            </div>
          </div>
          <Chat room={room} />
        </> :
        
        <div className="room-seletor flex flex-col h-screen items-center justify-center">
          <div className="logo">
            <img src={logo} alt="Papo do Bom logo" />
            <h2 className="text-center font-cursive text-indigo-400 text-3xl mt-1 subpixel-antialiased">Papo do Bom</h2>
          </div>
          <div className="room flex flex-col md:flex-row items-center mt-12 md:gap-4">
            <label className="text-indigo-400 font-bold">Nome da Sala:</label>
            <input ref={roomInputRef} maxLength="18" className="w-48 h-10 px-2 text-gray-900 text-center rounded mt-1 md:mt-0" />
            <button 
              className="flex items-center gap-x-2 bg-gradient-to-br from-indigo-600 to-indigo-900
              mt-4 md:mt-0 px-4 py-2 rounded border-2 border-style-solid border-neutral-800
              font-medium
              active:hover:border-indigo-500
              md:hover:border-indigo-500
              transition-colors select-none antialiased"
              onClick={() => setRoom(roomInputRef.current.value.toLowerCase())}>
              Entrar
              <DoorOpen size={28} weight="fill" />
            </button>
          </div>
          <button 
            className="
            flex gap-2
            bg-gradient-to-br from-indigo-600 to-indigo-900
            font-medium
            mt-16 px-4 py-2 rounded border-2 border-style-solid border-neutral-800
            active:hover:border-indigo-500
            md:hover:border-indigo-500
            transition-colors select-none antialiased"
            onClick={signUserOut}
          >
            <span>Deslogar</span>
            <SignOut weight="duotone" size={24} />
          </button>
        </div>
      } 

      
    </div>
  )
  
}
