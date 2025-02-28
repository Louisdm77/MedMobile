import React from "react";
import { useUserAuth } from "../../assets/context/userAuthContext";
import { useState, useEffect } from "react";
import fetchPatientDetails from "../fetchPatientDetails";


const PatientContactDetails = () => {
  const { user, patientDetail, setPatientDetail } = useUserAuth();
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
  useEffect(() => {
    fetchPatientDetails(user, setPatientDetail, null);
  }, [user]);

  return (
    <div className="w-full p-4 ">
      <div className="line mt-4 bg-white shadow rounded-xl p-4 mb-2 text-sm  h-auto font-normal flex justify-between items-center">
        <ul className="">
          <li>
            <span className="capitalize font-bold">Name:</span> &nbsp;
            <span>{patientDetail["fullName"]}</span>
          </li>
          <li>
            <span className="capitalize font-bold">Email Address:</span> &nbsp;
            <span>{patientDetail["email"]}</span>
          </li>
          <li>
            <span className="capitalize font-bold">Hospital Number:</span>{" "}
            &nbsp;
            <span>{patientDetail["hospitalNum"]}</span>
          </li>
          <li>
            <span className="capitalize font-bold">Phone:</span> &nbsp;
            <span>{patientDetail["phoneNumber"]}</span>
          </li>{" "}
          <li>
            <span className="capitalize font-bold">Address:</span> &nbsp;
            {/* <span>{patientDetail["address"]}</span> */}
            <span>1234 Elm Street Springfield, IL 62704 USA</span>
          </li>
        </ul>
      </div>

      <div>
        <h2 className="font-bold text-lg mt-4">Medical Information</h2>
        <ul className="grid grid-cols-2 gap-4 text-sm font-medium p-1 bg-white shadow rounded-xl p-4">
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

      <h2 className='font-bold mt-4'>Appointments and Records</h2>
    </div>
  );
};

export default PatientContactDetails;
