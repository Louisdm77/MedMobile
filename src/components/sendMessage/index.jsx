import React, { useEffect, useState, useRef } from "react";
import { auth, db } from "../../assets/firebaseConfig";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  serverTimestamp,
  orderBy,
  setDoc,
  doc,
} from "@firebase/firestore";
import { MdSend } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import MessangerInfo from "../messagerInfo";
import { MdPlayArrow } from "react-icons/md";
import { useUserAuth } from "../../assets/context/userAuthContext";

const SendMessage = ({ otherUserId, otherUserName }) => {
  const { patientDetail, messages, setMessages, lastMsg, setLastMsg } =
    useUserAuth();
  const [newMessage, setNewMessage] = useState("");

  const { uid, displayName, photoURL } = auth.currentUser || {};
  const msgEnd = useRef(null);

  const conversationId =
    uid && otherUserId
      ? uid > otherUserId
        ? `${otherUserId}_${uid}`
        : `${uid}_${otherUserId}`
      : "";

  useEffect(() => {
    console.log("Last Message Updated:", lastMsg);
    if (!conversationId) return;

    const q = query(
      collection(db, "conversations", conversationId, "messages"),
      orderBy("createdAt")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      setMessages(messagesData);
      msgEnd.current.scrollIntoView({ behavior: "smooth" });
    });

    return () => unsubscribe();
  }, [conversationId]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") {
      alert("Enter a valid message");
      return;
    }

    if (!uid || !patientDetail) {
      alert("User not authenticated or patient details missing");
      return;
    }

    const messageData = {
      text: newMessage,
      user: {
        uid: uid,
        name: patientDetail.fullName,
        photo: photoURL,
      },
      otherUser: {
        id: otherUserId,
        name: otherUserName,
      },
      createdAt: serverTimestamp(),
    };

    // Add the new message to Firestore
    await addDoc(
      collection(db, "conversations", conversationId, "messages"),
      messageData
    );

  
    const lastMessage = {
      conversationId: conversationId,
      message: {
        text: newMessage,
        createdAt: messageData.createdAt,
      },
    };

    // Save last message to Firestore
    await setDoc(doc(db, "last_msgs", conversationId), lastMessage);

    setLastMsg((prev) => {
      const updatedMessages = prev.filter(
        (msg) => msg.conversationId !== conversationId
      );
      return [...updatedMessages, lastMessage];
    });

    setNewMessage(""); // Clear input after sending
  };

  return (
    <div className="relative h-full">
      <MessangerInfo />
      <div className="overflow-y-auto h-[55vh] hide-scrollbar p-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`mt-2 ${
              msg.data.user.uid === uid
                ? "flex justify-end"
                : "flex justify-start"
            } relative`}
          >
            <div
              className={`text-white rounded-lg px-4 py-2 msg max-w-[70%] ${
                msg.data.user.uid === uid ? "ml-2 view" : "mr-2 viewi"
              }`}
            >
              <p className="text-sm">{msg.data.text}</p>
              <p className="text-xs font-light self-end mt-1">
                {msg.data.createdAt
                  ? msg.data.createdAt.toDate().toLocaleTimeString(undefined, {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })
                  : "`"}
              </p>
              <div
                className={`absolute text-3xl ${
                  msg.data.user.uid === uid
                    ? "right-[-14px] rotate-80 top-[-10px] homee"
                    : "left-[-14px] rotate-220 viewii top-[-10px]"
                }`}
              >
                <MdPlayArrow />
              </div>
            </div>
          </div>
        ))}
        <div ref={msgEnd} />
      </div>
      <form
        className="absolute bottom-0 left-0 right-0 p-4 flex items-center view rounded-xl"
        onSubmit={sendMessage} // Call sendMessage on form submit
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
        <button type="submit" className="text-2xl text-white">
          <MdSend />
        </button>
      </form>
    </div>
  );
};

export default SendMessage;
