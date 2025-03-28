import React, { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoWarningOutline } from "react-icons/io5";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { db } from "../../assets/firebaseConfig"; // Your Firestore config
import { doc, getDoc, updateDoc } from "@firebase/firestore"; // Import Firestore functions
import { useUserAuth } from "../../assets/context/userAuthContext";
import AppointmentModal from "../appointmentModal";

const Applications = () => {
  const { user } = useUserAuth();
  const [appointments, setAppointments] = useState([]);
  const [appointmentHistory, setAppointmentHistory] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const docRef = doc(db, "patientsData", user.uid);
        const patientDoc = await getDoc(docRef);
        if (patientDoc.exists()) {
          const data = patientDoc.data();

          // Filter appointments to exclude canceled and completed ones
          const upcomingAppointments = (data.appointments || []).filter(
            (app) => app.status !== "Canceled" && app.status !== "Completed"
          );

          const formattedAppointments = upcomingAppointments.map((app) => ({
            ...app,
            date: app.date.toDate().toLocaleDateString(),
            time: app.time,
          }));

          setAppointments(formattedAppointments);
          setAppointmentHistory(data.appointmentHistory || []);
        }
      } catch (error) {
        console.error("Error fetching appointments: ", error);
      }
    };

    fetchAppointments();
  }, [user.uid]);

  const handleAppointmentClick = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAppointment(null);
  };

  const handleCancel = async (appointment) => {
    const updatedAppointment = { ...appointment, status: "Canceled" };

    // Log to verify which appointment is being canceled
    console.log("Canceling appointment:", appointment);

    // Update Firestore: only the specific appointment
    const updatedAppointments = appointments.map((app) =>
      app.id === appointment.id ? updatedAppointment : app
    );

    await updateDoc(doc(db, "patientsData", user.uid), {
      appointments: updatedAppointments,
      appointmentHistory: [...appointmentHistory, updatedAppointment],
    });

    // Update local state
    setAppointments(
      updatedAppointments.filter((app) => app.id !== appointment.id)
    ); // Remove canceled appointment from upcoming
    setAppointmentHistory((prev) => [...prev, updatedAppointment].slice(-2)); // Keep only the most recent 2
    handleCloseModal();
  };

  const handleComplete = async (appointment) => {
    const updatedAppointment = { ...appointment, status: "Completed" };

    // Log to verify which appointment is being completed
    console.log("Completing appointment:", appointment);

    // Update Firestore: only the specific appointment
    const updatedAppointments = appointments.map((app) =>
      app.id === appointment.id ? updatedAppointment : app
    );

    await updateDoc(doc(db, "patientsData", user.uid), {
      appointments: updatedAppointments,
      appointmentHistory: [...appointmentHistory, updatedAppointment],
    });

    // Update local state
    setAppointments(
      updatedAppointments.filter((app) => app.id !== appointment.id)
    ); // Remove completed appointment from upcoming
    setAppointmentHistory((prev) => [...prev, updatedAppointment].slice(-1)); // Keep only the most recent 2
    handleCloseModal();
  };

  return (
    <div>
      <div className="w-full p-4 ">
        <h2 className="font-bold mb-2 text-lg">Upcoming Applications</h2>
        <div className="overflow-auto h-70">
          {appointments.length > 0 ? (
            appointments.map((app, index) => (
              <div
                key={index}
                className="bg-white shadow text-black rounded-lg px-4 py-2 mb-2 text-md leading-relaxed h-auto font-normal flex justify-between items-center"
                onClick={() => handleAppointmentClick(app)}
              >
                <div>
                  <p>
                    <span>Doctor</span>: <span>{app.doctor}</span>
                  </p>
                  <p>
                    <span>Date</span>: <span>{app.date}</span>
                  </p>
                  <p>
                    <span>Time</span>: <span>{app.time}</span>
                  </p>
                </div>
                <div className="text-white view p-2 rounded-xl text-sm flex justify-between items-center w-30">
                  <span>View Details</span> &nbsp;
                  <span>
                    <FaArrowRightLong />
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white shadow text-black rounded-lg px-4 py-2 mb-2 text-md leading-relaxed h-auto font-normal flex justify-between items-center">
              <p>No upcoming appointments.</p>
            </div>
          )}
        </div>
        <div>
          <h2 className="font-bold mb-2">Past Appointments</h2>
          <div className="overflow-auto h-55">
            {appointmentHistory.length > 0 ? (
              appointmentHistory.slice(-2).map((history, index) => (
                <div
                  key={index}
                  className="bg-white shadow text-black rounded-lg px-4 py-2 mb-2 text-md leading-relaxed h-auto font-normal flex justify-between items-center"
                >
                  <div className="flex-grow">
                    <p>
                      <span>Doctor:&nbsp; {history.doctor}</span>
                    </p>
                    <p>
                      <span>Date</span>: <span>{history.date}</span>
                    </p>
                    <p>
                      <span>Time</span>: <span>{history.time}</span>
                    </p>
                    <p>
                      <span>
                        {history.status === "Canceled" ? (
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
                </div>
              ))
            ) : (
              <div className="bg-white shadow text-black rounded-lg px-4 py-2 mb-2 text-md leading-relaxed h-auto font-normal flex justify-between items-center">
                <p>No past appointments.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <AppointmentModal
          appointment={selectedAppointment}
          onClose={handleCloseModal}
          onCancel={handleCancel}
          onComplete={handleComplete}
        />
      )}
    </div>
  );
};

export default Applications;
