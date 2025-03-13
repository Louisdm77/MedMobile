import React, { useState } from "react";
import { BiSolidToggleLeft } from "react-icons/bi";
import { BiSolidToggleRight } from "react-icons/bi";
const Notifications = () => {
  const [remind, setRemind] = useState(true);
  const [chatNotify, setChatNotify] = useState(true);
  const [updates, setUpdates] = useState(true);

  const toggleReminderOn = () => {
    setRemind(true);
  };

  const toggleReminderOff = () => {
    setRemind(false);
  };

  const toggleChatOn = () => {
    setChatNotify(true);
  };

  const toggleChatOff = () => {
    setChatNotify(false);
  };

  const toggleUpdatesOn = () => {
    setUpdates(true);
  };

  const toggleUpdatesOff = () => {
    setUpdates(false);
  };
  return (
    <div>
      <h2 className="homee font-semibold mb-1 p-1">Notifications</h2>
      <div className=" shadow-lg bg-white p-3 rounded-md text-sm">
        <div className="flex justify-between items-center">
          <div>Appointment Reminders</div>
          <div>
            {" "}
            <button>
              <BiSolidToggleRight
                className={`${remind ? "block" : "hidden"} text-2xl`}
                onClick={toggleReminderOff}
              />
            </button>
            <button>
              <BiSolidToggleLeft
                className={`${
                  remind ? "hidden" : "block"
                } text-2xl text-gray-500`}
                onClick={toggleReminderOn}
              />
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div>Chat Notification</div>
          <div>
            {" "}
            <button>
              <BiSolidToggleRight
                className={`${chatNotify ? "block" : "hidden"} text-2xl`}
                onClick={toggleChatOff}
              />
            </button>
            <button>
              <BiSolidToggleLeft
                className={`${
                  chatNotify ? "hidden" : "block"
                } text-2xl text-gray-500`}
                onClick={toggleChatOn}
              />
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div>General Announcements & Updates</div>
          <div>
            {" "}
            <button>
              <BiSolidToggleRight
                className={`${updates ? "block" : "hidden"} text-2xl `}
                onClick={toggleUpdatesOff}
              />
            </button>
            <button>
              <BiSolidToggleLeft
                className={`${
                  updates ? "hidden" : "block"
                } text-2xl text-gray-500`}
                onClick={toggleUpdatesOn}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
