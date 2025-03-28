import { collection, onSnapshot } from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import { LiaUser } from "react-icons/lia";
import { db } from "../../assets/firebaseConfig";
import { useUserAuth } from "../../assets/context/userAuthContext";

const Admins = ({ otherUserId, otherUserName, conversationId }) => {
  const [users, setUsers] = useState([]);
  const { setClickedUser, patientDetail, adminInfo, viewChat, setViewChat } =
    useUserAuth();
  const [lasts, setLasts] = useState([]);

  // Fetch user list
  useEffect(() => {
    const userListRef = collection(db, "patientsData");
    const unsubscribe = onSnapshot(
      userListRef,
      (snapshot) => {
        const usersList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Snapshot Data:", usersList);
        setUsers(usersList);
      },
      (error) => {
        console.error("Error fetching users:", error);
      }
    );
    return () => {
      console.log("Unsubscribing from user updates");
      unsubscribe();
    };
  }, []);

  // Fetch last messages
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "last_msgs"),
      (snapshot) => {
        const lastMessages = snapshot.docs.map((doc) => ({
          conversationId: doc.id,
          ...doc.data(),
        }));
        setLasts(lastMessages);
        console.log("Last Messages:", lastMessages);
      },
      (error) => {
        console.error("Error fetching last messages:", error);
      }
    );
    return () => {
      console.log("Unsubscribing from last messages updates");
      unsubscribe();
    };
  }, []);

  const getLastMsgs = (id) => {
    if (!adminInfo.uid || !id) return "No messages yet";
    const conversationId =
      adminInfo.uid > id ? `${id}_${adminInfo.uid}` : `${adminInfo.uid}_${id}`;
    const message = lasts.find((msg) => msg.conversationId === conversationId);
    return message ? (
      message.message.text.length > 30 ? (
        message.message.text.substring(0, 35) + " ..."
      ) : (
        message.message.text
      )
    ) : (
      <span className="text-blue-500">start chat</span>
    );
  };

  const getLastMsgsTime = (id) => {
    if (!adminInfo.uid || !id) return "";

    const conversationId =
      adminInfo.uid > id ? `${id}_${adminInfo.uid}` : `${adminInfo.uid}_${id}`;
    const message = lasts.find((msg) => msg.conversationId === conversationId);

    if (!message || !message.message.createdAt) return "";

    const msgDate = message.message.createdAt.toDate();
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    // Reset time portion for accurate date comparison
    const resetTime = (date) =>
      new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const msgDay = resetTime(msgDate);
    const todayDay = resetTime(today);
    const yesterdayDay = resetTime(yesterday);

    if (msgDay.getTime() === todayDay.getTime()) {
      return msgDate.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } else if (msgDay.getTime() === yesterdayDay.getTime()) {
      return "Yesterday";
    } else {
      return msgDate.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      });
    }
  };

  // Sort users by last message timestamp (most recent first)
  const sortedUsers = [...users].sort((a, b) => {
    const aConversationId =
      patientDetail.uid > a.id
        ? `${a.id}_${patientDetail.uid}`
        : `${patientDetail.uid}_${a.id}`;
    const bConversationId =
      patientDetail.uid > b.id
        ? `${b.id}_${patientDetail.uid}`
        : `${patientDetail.uid}_${b.id}`;

    const aMessage = lasts.find(
      (msg) => msg.conversationId === aConversationId
    );
    const bMessage = lasts.find(
      (msg) => msg.conversationId === bConversationId
    );

    const aTime = aMessage?.message?.createdAt?.toDate?.() || 0;
    const bTime = bMessage?.message?.createdAt?.toDate?.() || 0;

    return bTime - aTime; // Descending order (most recent first)
  });

  return (
    <div className="h-[80vh] overflow-y-scroll hide-scrollbar">
      <ul>
        {users.length === 0 ? (
          <li>Loading users...</li>
        ) : (
          sortedUsers.map((user) => (
            <li
              className="flex justify-between items-center p-3 mt-4 shadow-md bg-white rounded-lg cursor-pointer"
              key={user.id}
              onClick={() => {
                setClickedUser({
                  userId: user.id,
                  name: user.fullName || "User",
                  email: user.email || "No email provided",
                });
                setViewChat(true);
                console.log("Clicked User:", user);
              }}
            >
              <div className="grid grid-cols-[10%_70%_20%] w-full">
                <div>
                  <LiaUser className="bg-gray-400 text-white rounded-full text-4xl mr-3" />
                </div>
                <div className="text-black font-bold">
                  <span className="capitalize">{user.fullName || "User"}</span>{" "}
                  <br />
                  <span className="text-sm text-gray-500">
                    {getLastMsgs(user.id)}
                  </span>
                </div>
                <div>
                  <span className="text-sm text-black ">
                    {getLastMsgsTime(user.id)}
                  </span>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Admins;
