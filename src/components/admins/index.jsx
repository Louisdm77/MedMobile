import { collection, onSnapshot, query } from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import { LiaUser } from "react-icons/lia";
import { db } from "../../assets/firebaseConfig";
import { useUserAuth } from "../../assets/context/userAuthContext";

const Admins = ({ otherUserId, otherUserName, conversationId }) => {
  const [users, setUsers] = useState([]);
  const { setClickedUser, patientDetail } = useUserAuth();
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

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "last_msgs"), // Correct: Fetch the entire collection
      (snapshot) => {
        const lastMessages = snapshot.docs.map((doc) => ({
          conversationId: doc.id, // Document ID is the conversationId
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
    if (!patientDetail.uid || !id) return "No messages yet"; // Guard against missing patientDetail.uid/id
    const conversationId =
      patientDetail.uid > id
        ? `${id}_${patientDetail.uid}`
        : `${patientDetail.uid}_${id}`;
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
    if (!patientDetail.uid || !id) return "No messages yet"; // Guard against missing patientDetail.uid/id
    const conversationId =
      patientDetail.uid > id
        ? `${id}_${patientDetail.uid}`
        : `${patientDetail.uid}_${id}`;
    const message = lasts.find((msg) => msg.conversationId === conversationId);
    return message && message.message.createdAt
      ? message.message.createdAt.toDate().toLocaleTimeString(undefined, {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      : "";
  };
  return (
    <div className="h-[80vh] overflow-y-scroll hide-scrollbar">
      <ul>
        {users.length === 0 ? (
          <li>Loading users...</li> // Add loading state
        ) : (
          users.map((user) => (
            <li
              className="flex justify-between items-center p-3 mt-4 shadow-md bg-white rounded-lg cursor-pointer"
              key={user.id}
              onClick={() => {
                setClickedUser({
                  userId: user.id,
                  name: user.fullName || "User",
                  email: user.email || "No email provided",
                });
                console.log("Clicked User:", user); // Log the clicked user
              }}
            >
              <div className="grid grid-cols-[10%_70%_20%] w-full">
                <div>
                  <LiaUser className="bg-gray-400 text-white rounded-full text-4xl mr-3" />
                </div>

                <div className="text-black font-bold">
                  <span>{user.fullName || "User"}</span> <br />
                  <span className="text-sm text-gray-500">
                    {getLastMsgs(user.id)}
                  </span>
                </div>

                <div>
                  <span className="text-sm text-black font-bold">
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
