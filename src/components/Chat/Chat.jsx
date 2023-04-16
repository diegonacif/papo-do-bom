import { useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { auth, db } from "../../firebase-config";

export const Chat = (props) => {
  const { room } = props;
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const messagesRef = collection(db, "messages");

  useEffect(() => {
    const queryMessages = query(
      messagesRef, 
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({...doc.data(), id: doc.id});
      });
      setMessages(messages);
    });

    return () => unsuscribe();
  }, []);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage === "") return;

    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });

    setNewMessage("");
  }

  return (
    <div className="chat-container 
      grid grid-rows-[auto_min-content]
      h-full w-screen px-4 overflow-scroll"
    >
      {/* <div className="header bg-gradient-to-b from-indigo-600">
        <h1 className="text-2xl font-bold">Sala: {room.toUpperCase()}</h1>
      </div> */}

      <div className="messages flex flex-col w-full max-w-full max-h-full overflow-y-scroll gap-y-3 py-4">
        {
          messages.map((message) => (
            <div 
              className={`message flex flex-col w-fit max-w-full px-3 py-2 rounded
              md:max-w-lg
              ${message.user == auth.currentUser.displayName ?
              'bg-indigo-900' : 'bg-neutral-700'}
              ${message.user == auth.currentUser.displayName &&
              'self-end'}`}
              key={message.id}
            >
              <span className="user min-w-max font-bold">
                {message.user}:
              </span>
              <p className="mt-1">{message.text}</p>
            </div>
          ))
        }
      </div>

      <form onSubmit={handleSubmit} className="new-message-form flex gap-x-4 pb-4">
        <input 
          className="new-message-input w-full px-2 text-gray-900 rounded" 
          placeholder="Type your message here..." 
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        />
        <button 
          className="send-button
          font-medium
          bg-gradient-to-br from-indigo-600 to-indigo-900
          px-4 py-1 rounded border-2 border-style-solid border-neutral-800
          active:hover:border-indigo-500
          md:hover:border-indigo-500
          transition-colors select-none"
          type="submit" 
        >
          Send
        </button>

      </form>
    </div>
  )
}
