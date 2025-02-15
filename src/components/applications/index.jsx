import React from "react";
import { Link } from "react-router-dom";

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

  return (
    <div>
      <div className="w-full p-6">
        <h2 className="font-bold mb-2">Upcoming Applications</h2>
        <Link to="/bookappointment">
          {" "}
          <button
            type="button"
            className="cont font-bold py-2 px-4 rounded mb-2"
          >
            Book an Appointment
          </button>
        </Link>

        <div>
          {applications.map((app, index) => (
            <div
              key={index}
              className="bg-gray-300 rounded-lg p-4 mb-2  h-35 font-medium"
            >
              <p>
                <span>{app.role}</span>: <span>{app.name}</span>
              </p>
              <p>
                <span>Date</span>: <span>{app.date}</span>
              </p>
              <p>
                <span>Time</span>: <span>{app.time}</span>
              </p>
            </div>
          ))}
        </div>
        <div>
          <h2 className="font-bold mb-2">Application History</h2>
          <div className="bg-gray-300 rounded-lg p-4 mb-2 h-35"></div>
        </div>
      </div>
    </div>
  );
};

export default Applications;
