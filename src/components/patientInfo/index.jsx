import React from "react";

const PatientInfo = () => {
  const patientInfo = [
    { name: "Blood Group", value: "O+" },
    { name: "Genotype", value: "AA" },
    { name: "Weight", value: "77kg" },
    { name: "Height", value: "6'2" },
    { name: "Medical Conditions", value: ["Diabetes", "HBP"] },
    { name: "Alergies", value: "None" },
  ];
  return (
    <div>
      <div className="w-full p-4">
        <div className="bg-gray-300 flex items-center justify-between p-4 rounded-lg">
          <div>
            <h2 className="font-bold text-2xl">Patient Information</h2>
            <ul className="grid grid-cols-2 gap-2 text-base font-medium p-3">
              {patientInfo.map((info, index) => {
                if (Array.isArray(info.value)) {
                  return (
                    <li key={index} className="border-b mt-2">
                      {info.name}:
                      {info.value.map((val, index) => val).join(", ")}
                    </li>
                  );
                } else {
                  return (
                    <li key={index} className="border-b mt-2">
                      {info.name}:{info.value}
                    </li>
                  );
                }
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientInfo;
