import React from "react";
import Layout from "../../components/layout";
import { IoSearchOutline } from "react-icons/io5";
import { FaRegBell, FaRegUser } from "react-icons/fa";
import SendMessage from "../../components/sendMessage";
import Admins from "../../components/admins";
import { useUserAuth } from "../../assets/context/userAuthContext";
import { FaMinus } from "react-icons/fa";

const Chat = () => {
  const { clickedUser, patientDetail, viewChat, setViewChat } = useUserAuth();

  // Ensure patientDetail is defined before accessing uid
  const uid = patientDetail ? patientDetail.uid : null;

  // Construct conversationId only if uid and clickedUser.userId are defined
  const conversationId =
    uid && clickedUser && clickedUser.userId
      ? uid > clickedUser.userId
        ? `${clickedUser.userId}_${uid}`
        : `${uid}_${clickedUser.userId}`
      : "";

  return (
    <Layout>
      <div className="w-full">
        <div>
          <div className="p-4 grid grid-cols-[55%_30%_10%] gap-4 items-center mt-2 relative">
            <div>
              <h1 className="font-bold text-2xl">Chats</h1>
              <p className="text-lg">Connect with Medical Personnel.</p>
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="rounded-full w-full h-10 p-2 color border-none"
              />

              <button className="absolute right-3 top-3 text-xl">
                <IoSearchOutline />
              </button>
            </div>
            <div className="flex justify-between items-center">
              <button className="bg-gray-300 rounded-full p-4 text-lg color">
                <FaRegBell />
              </button>
              <button className="bg-gray-300 rounded-full p-4 text-lg color">
                <FaRegUser />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 p-2">
            <div className="p-2">
              <Admins
                otherUserId={clickedUser.userId}
                otherUserName={clickedUser.name}
                conversationId={conversationId}
              />
            </div>

            <div
              className={`w-full h-[82vh] relative shadow-2xl  ${
                viewChat ? "block" : "hidden"
              }`}
            >
              <button
                className="absolute view top-[-15px] right-6 z-30 text-white p-1"
                onClick={() => {
                  setViewChat(false);
                }}
              >
                <FaMinus />
              </button>
              <SendMessage
                conversationId={conversationId}
                otherUserId={clickedUser.userId}
                otherUserName={clickedUser.name}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Chat;
