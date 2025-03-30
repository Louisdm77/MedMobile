import React, { useEffect, useState } from "react";
import { useUserAuth } from "../../assets/context/userAuthContext";
import { collection, getDocs } from "@firebase/firestore";
import { db } from "../../assets/firebaseConfig";

const AppointmentsInfo = () => {
  const { user } = useUserAuth();
  const [confirmedCount, setConfirmedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        console.log("Current Doctor (user.displayName):", user?.displayName); // Log doctor name

        const querySnapshot = await getDocs(collection(db, "patientsData"));
        const allAppointments = [];

        querySnapshot.docs.forEach((doc) => {
          const patientData = doc.data();
          const appointments = patientData.appointments || [];
          console.log(`Patient ${doc.id} Appointments:`, appointments); // Log each patient's appointments
          appointments.forEach((app) => {
            if (app.doctor === user.displayName) {
              allAppointments.push(app);
            }
          });
        });

        console.log("Filtered Appointments for Doctor:", allAppointments); // Log filtered appointments

        // Sort appointments by date (optional)
        allAppointments.sort((a, b) => {
          const dateA = a.date?.toDate ? a.date.toDate() : new Date(a.date);
          const dateB = b.date?.toDate ? b.date.toDate() : new Date(b.date);
          return dateA - dateB;
        });

        // Count appointments
        const confirmed = allAppointments.filter(
          (app) => app.status === "cancelled" || app.status === "completed"
        ).length;
        const pending = allAppointments.filter(
          (app) => app.status === "pending"
        ).length;

        console.log("Confirmed Count:", confirmed); // Log counts
        console.log("Pending Count:", pending);

        setConfirmedCount(confirmed);
        setPendingCount(pending);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    if (user?.displayName) {
      fetchAppointments();
    } else {
      console.log("No user.displayName available");
    }
  }, [user]);

  return (
    <div className="p-2">
      <h2 className="font-semibold text-lg mb-4">Appointments</h2>
      <div className="grid grid-cols-2 gap-4 bg-white p-4 rounded-xl text-sm h-25">
        <div className="flex flex-col items-center justify-center bg-blue-500 text-white font-bold rounded-2xl p-1">
          <span className="text-2xl">{confirmedCount}</span>
          <span className="text-sm">Confirmed</span>
        </div>
        <div className="flex flex-col items-center justify-center bg-gray-200 text-black font-bold rounded-2xl p-1">
          <span className="text-2xl">{pendingCount}</span>
          <span className="text-sm">Pending</span>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsInfo;