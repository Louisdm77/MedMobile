import React, { useEffect, useState } from "react";
import Layout from "../layout";
import { useUserAuth } from "../../assets/context/userAuthContext";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { collection, getDocs, updateDoc, doc } from "@firebase/firestore";
import { db } from "../../assets/firebaseConfig";
import dp from "../../assets/images/profile.avif";
import { FaRegStar } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

const BookAppointments = () => {
  const { user, patientDetail, adminData, setAdminData, view, setView } =
    useUserAuth();

  const [appointmentDetails, setAppointmentDetails] = useState({
    currentStep: 1,
    selectedDoctor: null,
    selectedDate: null,
    selectedTime: null,
    appointmentType: "virtual",
    notes: "",
    status: "pending",
  });

  const timeSlots = ["09:00 AM", "10:00 AM", "12:00 pm", "01:00 PM"];

  const handleDateChange = (date) => {
    setAppointmentDetails((prev) => ({ ...prev, selectedDate: date }));
  };

  const handleTimeSelect = (time) => {
    setAppointmentDetails((prev) => ({ ...prev, selectedTime: time }));
  };

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "admindata"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAdminData(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAdminData();
  }, []);

  const handleContinue = () => {
    setAppointmentDetails((prev) => ({
      ...prev,
      currentStep: prev.currentStep + 1,
    }));
  };

  const handleBack = () => {
    setAppointmentDetails((prev) => ({
      ...prev,
      currentStep: prev.currentStep - 1,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create appointment object
    const appointment = {
      doctor: appointmentDetails.selectedDoctor,
      date: appointmentDetails.selectedDate,
      time: appointmentDetails.selectedTime,
      appointmentType: appointmentDetails.appointmentType,
      notes: appointmentDetails.notes,
      status: appointmentDetails.status,
    };

    try {
      // Update the patient's document in Firestore
      const patientDocRef = doc(db, "patientsData", user.uid); // Use user's UID to identify the document
      await updateDoc(patientDocRef, {
        appointments: [...patientDetail.appointments, appointment], // Push the new appointment into the appointments array
      });

      // Reset the appointment details
      setAppointmentDetails({
        currentStep: 1,
        selectedDoctor: null,
        selectedDate: null,
        selectedTime: null,
        appointmentType: "virtual",
        notes: "",
        status: "pending",
      });

      console.log("Appointment successfully added!");
    } catch (error) {
      console.error("Error adding appointment: ", error);
    }
  };
  const handleView = () => {
    setView(false);
  };

  return (
    <div
      className={`lg:w-80 absolute z-23 left-120 top-2 bg-white shadow-2xl text-black p-4 h-[90%] hide-scrollbar viewii overflow-scroll ${
        view ? "block" : "hidden"
      }`}
    >
      <h2 className="text-center font-semibold">Book an Appointment</h2>
      <button className="absolute right-0 top-0 text-2xl" onClick={handleView}>
        <MdCancel />
      </button>

      {appointmentDetails.currentStep === 1 && (
        <div>
          <p className="mt-4 mb-2 font-semibold text-sm">Select Doctor</p>
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
            {adminData.map((data) => (
              <div
                key={data.id}
                className={`w-full text-black text-sm pointer-cursor p-2 border border-2 rounded-xl shadow-lg transition-transform transform ${
                  appointmentDetails.selectedDoctor === data.fullName
                    ? "bg-blue-100 scale-105"
                    : "hover:scale-105"
                } cursor-pointer`}
                onClick={() =>
                  setAppointmentDetails((prev) => ({
                    ...prev,
                    selectedDoctor: data.fullName,
                  }))
                }
              >
                <img
                  src={dp}
                  alt="Doctor"
                  className="w-full h-20 object-cover rounded-t-xl"
                />
                <div className="p-2">
                  <p className="font-bold h-10">{data.fullName}</p>
                  <p className="mt-1 text-gray-600 font-semibold">
                    {data.specialty}
                  </p>
                  <div className="flex justify-between items-center mt-2">
                    <p className="green text-xs">Available</p>
                    <p className="flex items-center text-xs text-yellow-500">
                      <FaRegStar /> <span className="ml-1">4.5/5</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={handleContinue}
            className="w-full view text-white p-2 rounded hover:bg-blue-600 mt-4"
            disabled={!appointmentDetails.selectedDoctor} // Disable if no doctor selected
          >
            Continue
          </button>
        </div>
      )}

      {appointmentDetails.currentStep === 2 && (
        <div>
          <p className="mt-4 font-semibold text-sm">Choose Date and Time</p>
          <DayPicker
            mode="single"
            selected={appointmentDetails.selectedDate}
            onSelect={handleDateChange}
            className="border border-2 compact-day-picker"
          />
          {appointmentDetails.selectedDate && (
            <div className="text-center mt-4">
              <p className="text-lg">{`Selected Date: ${appointmentDetails.selectedDate.toLocaleDateString()}`}</p>
              <div className="mt-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    className={`w-full border rounded p-2 my-1 ${
                      appointmentDetails.selectedTime === time
                        ? "view text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    } mb-2 rounded-full`}
                    onClick={() => handleTimeSelect(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
              <button
                onClick={handleContinue}
                className="w-full view text-white p-2 rounded hover:bg-blue-600 mt-4"
                disabled={
                  !appointmentDetails.selectedDate ||
                  !appointmentDetails.selectedTime
                } // Disable if no date/time selected
              >
                Continue
              </button>
              <button
                onClick={handleBack}
                className="w-full bg-gray-300 text-black p-2 rounded hover:bg-gray-400 mt-2"
              >
                Back
              </button>
            </div>
          )}
        </div>
      )}

      {appointmentDetails.currentStep === 3 && (
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Appointment Type:
            </label>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                name="appointmentType"
                value="virtual"
                checked={appointmentDetails.appointmentType === "virtual"}
                onChange={() =>
                  setAppointmentDetails((prev) => ({
                    ...prev,
                    appointmentType: "virtual",
                  }))
                }
                className="mr-2"
              />
              <label>Virtual</label>
            </div>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                name="appointmentType"
                value="in-person"
                checked={appointmentDetails.appointmentType === "in-person"}
                onChange={() =>
                  setAppointmentDetails((prev) => ({
                    ...prev,
                    appointmentType: "in-person",
                  }))
                }
                className="mr-2"
              />
              <label>In-Person</label>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Notes:</label>
            <textarea
              value={appointmentDetails.notes}
              onChange={(e) =>
                setAppointmentDetails((prev) => ({
                  ...prev,
                  notes: e.target.value,
                }))
              }
              rows="4"
              className="w-full border rounded p-2"
              placeholder="Enter any additional notes here..."
            />
          </div>
          <button
            onClick={(e) => {
              handleSubmit(e);
              handleView();
            }}
            className="w-full view text-white p-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
          <button
            onClick={handleBack}
            className="w-full bg-gray-300 text-black p-2 rounded hover:bg-gray-400 mt-2"
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
};

export default BookAppointments;
