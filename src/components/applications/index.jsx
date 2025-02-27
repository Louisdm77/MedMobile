import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

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

  ]

  return (
    <div>
      <div className="w-full p-4">
        <h2 className="font-bold mb-2 text-lg">Upcoming Applications</h2>

        <div>
          {applications.map((app, index) => (
            <div
              key={index}
              className="bg-white shadow text-black  rounded-lg p-4 mb-2  h-32 font-medium flex justify-between items-center"
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
              <button className="text-white view p-2 rounded-3xl text-sm flex justify-between items-center">
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
          <div className="color rounded-lg p-4 mb-2 h-25"></div>
        </div>
      </div>
    </div>
  );
};

export default Applications;
