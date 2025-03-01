import React, { useEffect, useState } from "react";
import { auth, db } from "../../assets/firebaseConfig";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "@firebase/firestore";
import { MdSend } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import MessangerInfo from "../messagerInfo";

const SendMessage = () => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const { uid, displayName, photoURL } = auth.currentUser;

  useEffect(() => {
    const q = query(collection(db, "messages"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      setMessages(messagesData);
      console.log(messagesData);
    });

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") {
      alert("Enter a valid message");
      return;
    }

    await addDoc(collection(db, "messages"), {
      text: newMessage,
      name: displayName,
      photo: photoURL,
      createdAt: serverTimestamp(),
      uid,
    });
    setNewMessage("");
    console.log(messages); // Clear the input field after sending the message
  };

  return (
    <div>
      <MessangerInfo />
      <div>
        {messages.map((msg) => (
          <div key={msg.id} >
            <p className="bg-white rounded-full mt-2 p-2 ">{msg.data.text}</p>
            <p classsName="text-sm">{msg.data.createdAt.toDate().toLocaleString()}</p>
          </div>
        ))}
      </div>
      <form
        className="absolute bottom-0 left-0 right-0 p-4 flex items-center view"
        onSubmit={sendMessage}
      >
        <button type="button" className="text-white text-2xl">
          <IoMdAddCircleOutline />
        </button>
        <div className="flex-grow mx-2">
          <label htmlFor="messageInput" className="sr-only">
            Enter Message
          </label>
          <input
            id="messageInput"
            name="messageInput"
            type="text"
            className="rounded-full w-full"
            placeholder="Type message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
        </div>
        <button
          type="submit" // Use type="submit" to trigger form submission
          className="text-2xl text-white"
        >
          <MdSend />
        </button>
      </form>
    </div>
  );
};

export default SendMessage;
