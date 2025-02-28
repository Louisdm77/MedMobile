import React, { useEffect } from "react";
import { PiNotepadLight } from "react-icons/pi";
import { PiPill } from "react-icons/pi";
import { PiStethoscope } from "react-icons/pi";
import { Link } from "react-router-dom";
import fetchPatientDetails from "../fetchPatientDetails";
import { useUserAuth } from "../../assets/context/userAuthContext";

const PatientInfo = () => {
  const { user, patientDetail, setPatientDetail } = useUserAuth();

  useEffect(() => {
    fetchPatientDetails(user, setPatientDetail, null);
  }, [user, setPatientDetail]); // Adding dependencies here

  const patientInfo = [
    { name: "Blood Group", value: patientDetail.bloodGroup || "" },
    { name: "Genotype", value: patientDetail.genotype || "" },
    {
      name: "Weight",
      value: patientDetail.weight ? `${patientDetail.weight} kg` : "",
    },
    {
      name: "Weight",
      value: patientDetail.height ? `${patientDetail.height} cm` : "",
    },
    {
      name: "Medical Conditions",
      value: patientDetail.medicalConditions || "none",
    },
    { name: "Allergies", value: patientDetail.allergies || "None" },
  ];

  const patientRecord = [
    {
      name: "Medical Information",
      icon: <PiNotepadLight />,
      link: "#",
    },
    {
      name: "Prescriptions",
      icon: <PiPill />,
      link: "#",
    },
    {
      name: "Lab Results",
      icon: <PiStethoscope />,
      link: "#",
    },
  ];

  return (
    <div>
      <div className="w-full p-4">
        <div className="bg-white  flex items-center justify-between p-4 rounded-2xl">
          <div>
            <h2 className="font-bold text-xl">Patient Information</h2>
            <ul className="grid grid-cols-2 gap-4 text-base font-medium p-1">
              {patientInfo.map((info, index) => {
                if (Array.isArray(info.value)) {
                  return (
                    <li key={index} className="border-b mt-2">
                      <span className="">{info.name}</span>: &nbsp;
                      {info.value.join(", ")}
                    </li>
                  );
                } else {
                  return (
                    <li key={index} className="border-b mt-2">
                      <span className="">{info.name || "none"}</span> : &nbsp;
                      {info.value}
                    </li>
                  );
                }
              })}
            </ul>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {patientRecord.map((rec, index) => {
            return (
              <Link key={index} to={rec.link}>
                <div className="bg-white  rounded-2xl text-center h-34 text-2xl font-medium flex flex-col items-center justify-center">
                  <div className="text-center">{rec.icon}</div>
                  <h3 className="mt-2">{rec.name}</h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PatientInfo;
