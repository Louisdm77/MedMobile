import React, { useState, useEffect, useCallback } from "react";
import { useUserAuth } from "../../assets/context/userAuthContext";
import { getPatientData } from "../../repository/post.service";

const fetchPatientDetailss = () => {
  const fetchPatientDetails = useCallback(async () => {
    const { user, isLoading, setIsLoading } = useUserAuth();
    const [patientDetail, setPatientDetail] = useState({});
    if (user) {
      try {
        const querySnapshot = await getPatientData(user.uid);
        if (querySnapshot.exists()) {
          const patientData = querySnapshot.data();
          setPatientDetail(patientData);
        } else {
          console.log("No patient data found");
        }
      } catch (error) {
        console.error("Error fetching patient data:", error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [isLoading]);
};
export default fetchPatientDetails;
