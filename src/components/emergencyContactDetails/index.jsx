import React, { useEffect } from "react";
import { useUserAuth } from "../../assets/context/userAuthContext";
import fetchPatientDetails from "../fetchPatientDetails";

const EmergencyContactDetails = () => {
  const { user, patientDetail, setPatientDetail } = useUserAuth();
  useEffect(() => {
    fetchPatientDetails(user, setPatientDetail, null);
  }, [user]);
  return (
    <div>
      <div>
        <h2 className="font-bold text-md">Emergency Contact(s)</h2>
        <ul className=" gap-4 text-sm font-medium p-1 bg-white shadow rounded-xl line p-4">
          <li>
            <span>Contact 1 : </span>
            <span>{patientDetail.emergencyContact}</span>
          </li>
          <li>
            <span>Phone/Mail : </span>
            <span>{patientDetail.emergencyContactNum} | info@gmail.com</span>
          </li>

          <hr className="font-bold"/>
          <li>
            <span>Contact 2 : </span>
            <span>{patientDetail.emergencyContact}</span>
          </li>
          <li>
            <span>Phone/Mail : </span>
            <span>{patientDetail.emergencyContactNum} | info@gmail.com</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default EmergencyContactDetails;
