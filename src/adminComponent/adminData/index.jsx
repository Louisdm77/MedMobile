import React, { useEffect, useState } from "react";
import { useUserAuth } from "../../assets/context/userAuthContext";
import { doc, getDoc } from "@firebase/firestore";
import { db } from "../../assets/firebaseConfig";

const AdminData = () => {
  const { user } = useUserAuth();
  const [adminInfo, setAdminInfo] = useState({
    fullName: user.displayName || "Unknown",
    specialty: "Radiologist", // Default until fetched
  });

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const adminDocRef = doc(db, "admindata", user.uid); // Use user.uid to fetch the specific admin document
        const adminDoc = await getDoc(adminDocRef);

        if (adminDoc.exists()) {
          const data = adminDoc.data();
          setAdminInfo({
            fullName: data.fullName || user.displayName || "Unknown", // Prefer Firestore fullName, fallback to user.displayName
            specialty: data.specialty || "Radiologist", // Update specialty from Firestore
          });
        } else {
          console.log("No admin data found for this user");
        }
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };

    if (user?.uid) {
      fetchAdminData();
    }
  }, [user]);

  return (
    <div>
      <div className="p-2">
        <h2 className="font-semibold text-lg mb-4">&nbsp;</h2>
        <div className="flex items-center bg-white p-3 rounded-xl h-25">
          <div className="w-15 h-15 bg-gray-300 rounded-full mr-4"></div>
          <div className="text-sm">
            <p className="font-bold text-md">Dr.{adminInfo.fullName}</p>
            <p className="font-semibold">{adminInfo.specialty}</p>
            <p className="text-xs">Regency Hospital</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminData;
