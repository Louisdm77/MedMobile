import React, { useEffect, useState } from "react";
import { useUserAuth } from "../../assets/context/userAuthContext";
import { collection, getDocs } from "@firebase/firestore";
import { db } from "../../assets/firebaseConfig";

const TodaysAppointments = () => {
  const { user } = useUserAuth();
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [nextAppointment, setNextAppointment] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null); // For modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "patientsData"));
        const allAppointments = [];

        querySnapshot.docs.forEach((doc) => {
          const patientData = doc.data();
          const appointments = patientData.appointments || [];
          appointments.forEach((app) => {
            if (app.doctor === user.displayName) {
              allAppointments.push(app);
            }
          });
        });

        allAppointments.sort((a, b) => {
          const dateA = a.date?.toDate ? a.date.toDate() : new Date(a.date);
          const dateB = b.date?.toDate ? b.date.toDate() : new Date(b.date);
          return dateA - dateB;
        });

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const todayApps = allAppointments.filter((app) => {
          const appDate = app.date?.toDate
            ? app.date.toDate()
            : new Date(app.date);
          appDate.setHours(0, 0, 0, 0);
          return appDate.getTime() === today.getTime();
        });

        setTodayAppointments(todayApps);

        if (todayApps.length === 0) {
          const futureApps = allAppointments.filter((app) => {
            const appDate = app.date?.toDate
              ? app.date.toDate()
              : new Date(app.date);
            return appDate > today;
          });
          setNextAppointment(futureApps.length > 0 ? futureApps[0] : null);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    if (user?.displayName) {
      fetchAppointments();
    }
  }, [user]);

  const handleViewClick = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAppointment(null);
  };

  return (
    <div className="p-6 bg-white">
      <h2 className="font-semibold text-lg mb-4">Today's Appointments</h2>
      <div className="bg-white p-4 rounded-xl">
        {todayAppointments.length === 0 ? (
          <div className="text-center">
            <p className="font-bold text-gray-700">
              No appointments today, Doc.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              {nextAppointment
                ? `Next appointment is on ${
                    nextAppointment.date?.toDate
                      ? nextAppointment.date.toDate().toLocaleDateString()
                      : new Date(nextAppointment.date).toLocaleDateString()
                  }`
                : "No upcoming appointments scheduled."}
            </p>
          </div>
        ) : (
          todayAppointments.map((app, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-2 border-b last:border-b-0"
            >
              <div className="text-sm">
                <p className="font-bold">{app.patientName}</p>
                <p className="text-gray-600">
                  {app.time} - {app.appointmentType}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleViewClick(app)}
                  className="view text-white px-4 py-1 rounded-lg hover:bg-blue-600"
                >
                  View
                </button>
                <button className="text-blue-500 hover:underline">
                  Reschedule
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal for Appointment Details */}
      {isModalOpen && selectedAppointment && (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96">
            <h3 className="font-semibold text-lg mb-4">Appointment Details</h3>
            <div className="text-sm space-y-2">
              <p>
                <span className="font-bold">Patient:</span>{" "}
                {selectedAppointment.patientName}
              </p>
              <p>
                <span className="font-bold">Date:</span>{" "}
                {selectedAppointment.date?.toDate
                  ? selectedAppointment.date.toDate().toLocaleDateString()
                  : new Date(selectedAppointment.date).toLocaleDateString()}
              </p>
              <p>
                <span className="font-bold">Time:</span>{" "}
                {selectedAppointment.time}
              </p>
              <p>
                <span className="font-bold">Type:</span>{" "}
                {selectedAppointment.appointmentType}
              </p>
              <p>
                <span className="font-bold">Status:</span>{" "}
                {selectedAppointment.status}
              </p>
              <p>
                <span className="font-bold">Notes:</span>{" "}
                {selectedAppointment.notes || "None"}
              </p>
            </div>
            <button
              onClick={closeModal}
              className="mt-6 w-full view bg-gray-300 text-white py-2 rounded-lg hover:bg-gray-400"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodaysAppointments;
