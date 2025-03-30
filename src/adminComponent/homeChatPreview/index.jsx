import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, onSnapshot } from "@firebase/firestore";
import { LiaUser } from "react-icons/lia";
import { db } from "../../assets/firebaseConfig";
import { useUserAuth } from "../../assets/context/userAuthContext";

const HomeChatPreview = () => {
  const { user, clicked, setClicked } = useUserAuth();
  const [patients, setPatients] = useState([]);
  const [lasts, setLasts] = useState([]);
  const navigate = useNavigate();

  // Fetch patient list from patientsData
  useEffect(() => {
    const patientListRef = collection(db, "patientsData");
    const unsubscribe = onSnapshot(
      patientListRef,
      (snapshot) => {
        const patientsList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Patients Snapshot Data:", patientsList);
        setPatients(patientsList);
      },
      (error) => {
        console.error("Error fetching patients:", error);
      }
    );
    return () => {
      console.log("Unsubscribing from patients updates");
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
        console.log("Last Messages (Home):", lastMessages);
        setLasts(lastMessages);
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
    if (!user?.uid || !id) {
      console.log("Missing user.uid or patient id:", { user, id });
      return "No messages yet";
    }
    const conversationId =
      user.uid > id ? `${id}_${user.uid}` : `${user.uid}_${id}`;
    const message = lasts.find((msg) => msg.conversationId === conversationId);
    return message
      ? message.message.text.length > 30
        ? message.message.text.substring(0, 35) + " ..."
        : message.message.text
      : "No messages yet"; // This won’t show since we filter below
  };

  const getLastMsgsTime = (id) => {
    if (!user?.uid || !id) return "";

    const conversationId =
      user.uid > id ? `${id}_${user.uid}` : `${user.uid}_${id}`;
    const message = lasts.find((msg) => msg.conversationId === conversationId);

    if (!message || !message.message.createdAt) return "";

    const msgDate = message.message.createdAt.toDate();
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

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

  // Filter patients with started chats and sort by last message timestamp
  const activeChatPatients = patients
    .map((patient) => {
      const conversationId =
        user?.uid > patient.id
          ? `${patient.id}_${user?.uid}`
          : `${user?.uid}_${patient.id}`;
      const lastMessage = lasts.find(
        (msg) => msg.conversationId === conversationId
      );
      return { ...patient, lastMessage };
    })
    .filter((patient) => patient.lastMessage) // Only keep patients with a last message
    .sort((a, b) => {
      const aTime = a.lastMessage?.message?.createdAt?.toDate?.() || 0;
      const bTime = b.lastMessage?.message?.createdAt?.toDate?.() || 0;
      return bTime - aTime; // Most recent first
    });

  const handleChatClick = (patient) => {
    const conversationId =
      user.uid > patient.id
        ? `${patient.id}_${user.uid}`
        : `${user.uid}_${patient.id}`;
    navigate("/admin/consultations", {
      state: {
        userId: patient.id,
        name: patient.fullName || "User",
        email: patient.email || "No email provided",
        conversationId,
      },
    });
    setClicked("Chat");
    console.log("Navigating to chat with:", patient);
  };

  return (
    <div className="h-[40vh] overflow-y-scroll hide-scrollbar">
      <h2 className="font-semibold text-lg p-6 pb-0">Recent Chats</h2>
      <ul>
        {patients.length === 0 ? (
          <li className="p-3">Loading patients...</li>
        ) : activeChatPatients.length === 0 ? (
          <li className="p-3 text-gray-500">No active chats yet.</li>
        ) : (
          activeChatPatients.map((patient) => (
            <li
              className="flex justify-between items-center p-3 mt-4 shadow-md bg-white rounded-lg cursor-pointer"
              key={patient.id}
              onClick={() => handleChatClick(patient)}
            >
              <div className="grid grid-cols-[15%_65%_20%] w-full">
                <div>
                  <LiaUser className="bg-gray-400 text-white rounded-full text-4xl mr-3" />
                </div>
                <div className="text-black font-bold">
                  <span className="capitalize">
                    {patient.fullName || "User"}
                  </span>
                  <br />
                  <span className="text-sm text-gray-500">
                    {getLastMsgs(patient.id)}
                  </span>
                </div>
                <div>
                  <span className="text-sm text-black">
                    {getLastMsgsTime(patient.id)}
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

export default HomeChatPreview;
