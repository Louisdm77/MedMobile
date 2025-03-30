import React, { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { auth, db } from "../../assets/firebaseConfig";
import { useUserAuth } from "../../assets/context/userAuthContext";
import { FaEye, FaSyncAlt, FaTimes } from "react-icons/fa";

const AdminApplications = () => {
  const [appointments, setAppointments] = useState([]);
  const [appointmentHistory, setAppointmentHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [showAllAppointments, setShowAllAppointments] = useState(false); // Toggle for View All
  const { user } = useUserAuth();

  useEffect(() => {
    if (!user?.displayName) {
      setError("No user or displayName available.");
      setLoading(false);
      return;
    }

    const patientsRef = collection(db, "patientsData");
    const unsubscribe = onSnapshot(
      patientsRef,
      (snapshot) => {
        const activeAppointments = [];
        const canceledAppointments = [];

        snapshot.docs.forEach((doc) => {
          const patientData = doc.data();
          const patientAppointments = patientData.appointments || [];

          const matchingAppointments = patientAppointments
            .filter((app) => app.doctor === user.displayName)
            .map((app) => ({
              ...app,
              patientId: doc.id,
              rawDate: app.date,
              date: app.date?.toDate
                ? app.date.toDate().toLocaleDateString()
                : new Date(app.date).toLocaleDateString(),
              time: app.time,
            }));

          matchingAppointments.forEach((app) => {
            if (app.status === "Canceled") {
              canceledAppointments.push(app);
            } else {
              activeAppointments.push(app);
            }
          });
        });

        setAppointments(activeAppointments);
        setAppointmentHistory(canceledAppointments);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching patientsData:", error);
        setError(error.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user?.displayName]);

  // Toggle expanded view
  const handleViewClick = (appointmentId) => {
    setExpandedId(expandedId === appointmentId ? null : appointmentId);
  };

  // Handle cancel (updates Firestore and moves to history)
  const handleCancel = async (appointment) => {
    const updatedAppointment = { ...appointment, status: "Canceled" };

    console.log("Canceling appointment:", appointment);

    try {
      const patientDocRef = doc(db, "patientsData", appointment.patientId);
      const patientSnap = await getDoc(patientDocRef);
      if (patientSnap.exists()) {
        const patientData = patientSnap.data();
        const currentAppointments = patientData.appointments || [];
        const currentHistory = patientData.appointmentHistory || [];

        const updatedAppointments = currentAppointments.filter((app) => {
          const appDate = app.date?.toDate
            ? app.date.toDate().toISOString()
            : app.date;
          const targetDate = appointment.rawDate?.toDate
            ? appointment.rawDate.toDate().toISOString()
            : appointment.rawDate;
          return !(appDate === targetDate && app.time === appointment.time);
        });

        const updatedHistory = [...currentHistory, updatedAppointment].slice(
          -2
        );

        await updateDoc(patientDocRef, {
          appointments: updatedAppointments,
          appointmentHistory: updatedHistory,
        });

        setAppointments((prev) =>
          prev.filter(
            (app) =>
              !(
                app.patientId === appointment.patientId &&
                app.rawDate === appointment.rawDate &&
                app.time === appointment.time
              )
          )
        );
        setAppointmentHistory((prev) =>
          [...prev, updatedAppointment].slice(-2)
        );
      }
    } catch (error) {
      console.error("Error canceling appointment:", error);
      setError(error.message);
    }
  };

  // Handle reload (placeholder)
  const handleReload = () => {
    console.log("Reload clicked - implement refresh logic if needed");
  };

  // Toggle View All
  const handleViewAll = () => {
    setShowAllAppointments(true);
  };

  if (loading) {
    return <div className="w-full p-4">Loading...</div>;
  }

  if (error) {
    return <div className="w-full p-4">Error: {error}</div>;
  }

  return (
    <div>
      <div className="w-full p-4">
        {/* Active Appointments */}
        <h2 className="font-bold mb-2 text-lg">Upcoming Applications</h2>
        <div
          className={`overflow-auto bg-white ${
            showAllAppointments ? "h-auto" : "h-70"
          }`}
        >
          {appointments.length > 0 ? (
            (showAllAppointments ? appointments : appointments.slice(0, 3)).map(
              (app, index) => {
                const appointmentId = `${app.patientId}-${index}`;
                const isExpanded = expandedId === appointmentId;

                return (
                  <div
                    key={appointmentId}
                    className="bg-white text-black rounded-lg px-4 py-2 mb-2 text-md leading-relaxed font-normal"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div>
                          <div className="w-15 h-15 bg-gray-400 rounded-full mr-4"></div>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold">
                            {app.patientName || "Unknown"}
                          </span>
                          <span>{app.time}</span>
                          <span className="text-gray-500 text-sm">
                            General Consultation
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-3">
                        <div className="flex justify-center">
                          <button
                            onClick={() => handleViewClick(appointmentId)}
                            className="bg-gray-400 view text-white p-2 rounded-xl gray"
                          >
                            View
                          </button>
                        </div>

                        <div className="flex justify-center">
                          <button
                            onClick={handleReload}
                            className="p-2 rounded-full gray"
                          >
                            <FaSyncAlt />
                          </button>
                        </div>

                        <div className="flex justify-center">
                          <button
                            onClick={() => handleCancel(app)}
                            className="p-2 rounded-full gray"
                          >
                            <FaTimes />
                          </button>
                        </div>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                        <p>
                          <span className="font-bold">Patient:</span>{" "}
                          {app.patientName || "Unknown"}
                        </p>
                        <p>
                          <span className="font-bold">Date:</span> {app.date}
                        </p>
                        <p>
                          <span className="font-bold">Time:</span> {app.time}
                        </p>
                        <p>
                          <span className="font-bold">Status:</span>{" "}
                          {app.status}
                        </p>
                        <p>
                          <span className="font-bold">Doctor:</span>{" "}
                          {app.doctor}
                        </p>
                      </div>
                    )}
                  </div>
                );
              }
            )
          ) : (
            <div className="bg-white shadow text-black rounded-lg px-4 py-2 mb-2 text-md leading-relaxed h-auto font-normal flex justify-between items-center">
              <p>No upcoming appointments found for {user.displayName}.</p>
            </div>
          )}
        </div>

        {/* View All Button */}
        {appointments.length > 3 && !showAllAppointments && (
          <button
            onClick={handleViewAll}
            className="mt-2 bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
          >
            View All
          </button>
        )}

        {/* Appointment History */}
        <h2 className="font-bold mb-2 text-lg mt-6">Appointment History</h2>
        <div className="overflow-auto h-70">
          {appointmentHistory.length > 0 ? (
            appointmentHistory.map((app, index) => {
              const appointmentId = `${app.patientId}-${index}`;
              const isExpanded = expandedId === appointmentId;

              return (
                <div
                  key={appointmentId}
                  className="bg-white shadow text-black rounded-lg px-4 py-2 mb-2 text-md leading-relaxed font-normal"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="font-bold">
                        {app.patientName || "Unknown"}
                      </span>
                      <span>{app.time}</span>
                      <span className="text-gray-500 text-sm">
                        General Consultation
                      </span>
                    </div>

                    <div className="grid grid-cols-3">
                      <div className="flex justify-center">
                        <button
                          onClick={() => handleViewClick(appointmentId)}
                          className="bg-gray-400 view text-white p-2 rounded-xl gray"
                        >
                          View
                        </button>
                      </div>

                      <div className="flex justify-center">
                        <button
                          onClick={handleReload}
                          className="p-2 rounded-full gray"
                        >
                          <FaSyncAlt />
                        </button>
                      </div>

                      <div className="flex justify-center">
                        <span className="p-2 rounded-full gray opacity-50">
                          <FaTimes />
                        </span>
                      </div>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                      <p>
                        <span className="font-bold">Patient:</span>{" "}
                        {app.patientName || "Unknown"}
                      </p>
                      <p>
                        <span className="font-bold">Date:</span> {app.date}
                      </p>
                      <p>
                        <span className="font-bold">Time:</span> {app.time}
                      </p>
                      <p>
                        <span className="font-bold">Status:</span> {app.status}
                      </p>
                      <p>
                        <span className="font-bold">Doctor:</span> {app.doctor}
                      </p>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="bg-white shadow text-black rounded-lg px-4 py-2 mb-2 text-md leading-relaxed h-auto font-normal flex justify-between items-center">
              <p>No appointment history for {user.displayName}.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminApplications;
