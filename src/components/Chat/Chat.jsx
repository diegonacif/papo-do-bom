import { useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { auth, db } from "../../firebase-config";

export const Chat = (props) => {
  const { room } = props;
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const testing = [
    {text: "opa"},
    {text: "eita"},
    {text: "caraca"}
  ]

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
    <div className="chat-container">
      <div className="header">
        <h1 className="text-2xl font-bold">Sala: {room.toUpperCase()}</h1>
      </div>

      <div className="messages flex flex-col gap-y-1 mt-4">
        {
          messages.map((message) => (
            <div className="message flex" key={message.id}>
              <span className="user font-bold">{message.user}:</span>
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
          className="send-button bg-indigo-900 px-4 py-1 rounded border-2 border-style-solid border-transparent
          hover:border-indigo-500
          transition-colors"
          type="submit" 
        >
          Send
        </button>

      </form>
    </div>
  )
}
