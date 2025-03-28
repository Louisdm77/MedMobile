import React from "react";
import { MdCancel } from "react-icons/md";

const AppointmentModal = ({ appointment, onClose, onCancel, onComplete }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-opacity-30" onClick={onClose} />
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full z-10 relative">
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition duration-200"
          onClick={onClose}
          aria-label="Close"
        >
          <MdCancel size={24} />
        </button>
        <h2 className="font-bold text-xl mb-4 text-gray-800">
          Appointment Details
        </h2>
        <div className="mt-2">
          <p className="text-gray-700">
            <strong className="font-bold w-32 inline-block">Doctor:</strong>{" "}
            {appointment.doctor}
          </p>
          <p className="text-gray-700">
            <strong className="font-bold w-32 inline-block">Type:</strong>{" "}
            {appointment.appointmentType}
          </p>
          <p className="text-gray-700">
            <strong className="font-bold w-32 inline-block">Date:</strong>{" "}
            {appointment.date}
          </p>
          <p className="text-gray-700">
            <strong className="font-bold w-32 inline-block">Time:</strong>{" "}
            {appointment.time}
          </p>
          <p className="text-gray-700">
            <strong className="font-bold w-32 inline-block">Patient:</strong>{" "}
            {appointment.patientName}
          </p>
          <p className="text-gray-700">
            <strong className="font-bold w-32 inline-block">Notes:</strong>{" "}
            {appointment.notes}
          </p>
          <p className="text-gray-700">
            <strong className="font-bold w-32 inline-block">Status:</strong>{" "}
            <span
              className={`font-semibold ${
                appointment.status === "Confirmed"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {appointment.status}
            </span>
          </p>
        </div>
        <div className="flex justify-between mt-4">
          <button
            className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition duration-200"
            onClick={() => onCancel(appointment)}
          >
            Cancel Appointment
          </button>
          <button
            className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition duration-200"
            onClick={() => onComplete(appointment)}
          >
            Complete Appointment
          </button>
        </div>
        <button
          className="mt-6 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-200 w-full"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AppointmentModal;
