import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoWarningOutline } from "react-icons/io5";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

const Applications = () => {
  const applications = [
    {
      role: "Doctor",
      name: "Dr Jane Doe (Neurology)",
      date: "January 10, 2025",
      time: "10:00am",
    },
    {
      role: "Doctor",
      name: "Dr John Smith (Cardiology)",
      date: "January 15, 2025",
      time: "11:00am",
    },
  ];

  const appointmentHistory = [
    {
      role: "Doctor",
      name: "Dr Jane Doe (Neurology)",
      date: "January 10, 2025",
      time: "10:00am",
      status: "completed",
    },
    {
      role: "Doctor",
      name: "Dr John Smith (Cardiology)",
      date: "January 15, 2025",
      time: "11:00am",
      status: "missed",
    },
  ];

  return (
    <div>
      <div className="w-full p-4 ">
        <h2 className="font-bold mb-2 text-lg">Upcoming Applications</h2>

        <div>
          {applications.map((app, index) => (
            <div
              key={index}
              className="bg-white shadow text-black  rounded-lg px-4 py-2 mb-2 text-md leading-relaxed h-auto font-normal flex justify-between items-center"
            >
              <div>
                <p>
                  <span>{app.role}</span>: <span>{app.name}</span>
                </p>
                <p>
                  <span>Date</span>: <span>{app.date}</span>
                </p>
                <p>
                  <span>Time</span>: <span>{app.time}</span>
                </p>
              </div>{" "}
              <button className="text-white view p-2 rounded-xl text-sm flex justify-between items-center w-30">
                <span>View Details</span> &nbsp;
                <span>
                  <FaArrowRightLong />
                </span>
              </button>
            </div>
          ))}
        </div>
        <div>
          <h2 className="font-bold mb-2">Past Appointments</h2>
          <div>
            {appointmentHistory.map((history, index) => {
              return (
                <div
                  key={index}
                  className="bg-white shadow text-black rounded-lg px-4 py-2 mb-2  text-md leading-relaxed h-auto font-normal flex justify-between items-center"
                >
                  <div className="flex-grow">
                    <p>
                      <span>Doctor:&nbsp; {history.name}</span>
                    </p>
                    <p>
                      <span>Date</span>: <span>{history.date}</span>
                    </p>
                    <p>
                      <span>Time</span>: <span>{history.time}</span>
                    </p>
                    <p>
                      <span>
                        {history.status === "missed" ? (
                          <span className="flex items-center text-red-500">
                            <IoWarningOutline /> &nbsp;{history.status}
                          </span>
                        ) : (
                          <span className="text-green-500 flex items-center">
                            <IoCheckmarkCircleOutline /> &nbsp;{history.status}
                          </span>
                        )}
                      </span>
                    </p>
                  </div>
                  <button className="text-white view p-2 rounded-xl text-sm w-30">
                    <span>
                      {history.status === "missed" ? "Reschedule" : "Summary"}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Applications;
