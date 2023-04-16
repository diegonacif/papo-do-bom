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

  console.log(messages);

  return (
    <div className="chat-container w-screen px-4">
      <div className="header">
        <h1 className="text-2xl font-bold">Sala: {room.toUpperCase()}</h1>
      </div>

      <div className="messages flex flex-col w-full gap-y-3 mt-4">
        {
          messages.map((message) => (
            <div 
              className={`message flex w-max max-w-full px-2 py-1 rounded
              bg-neutral-700 
              md:max-w-lg
              ${message.user == auth.currentUser.displayName && 'self-end'}`}
              key={message.id}
            >
              <span className="user min-w-max font-bold">
                {message.user}:
              </span>
              <p className="ml-2">{message.text}</p>
            </div>
          ))
        }
      </div>

      <form onSubmit={handleSubmit} className="new-message-form flex gap-x-4 mt-4">
        <input 
          className="new-message-input px-2 text-gray-900 rounded" 
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
