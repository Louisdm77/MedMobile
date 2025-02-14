import React, { useEffect, useState } from "react";
import fetchPatientDetails from "../fetchPatientDetails";
import { useUserAuth } from "../../assets/context/userAuthContext";
import { updatePatientDetails } from "../../repository/post.service";

const DataForm = () => {
  const { user, patientDetail, setPatientDetail } = useUserAuth();

  useEffect(() => {
    fetchPatientDetails(user, setPatientDetail, null);
  }, [user]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setPatientDetail((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    try {
      await updatePatientDetails(patientDetail);
    } catch (err) {
      console.log(err);
    }

    console.log(patientDetail);
  };

  const [val, setVal] = useState("");
  const [condition, setCondition] = useState("");
  const addAllergies = (e) => {
    e.preventDefault(); // Prevent default form submission
    setPatientDetail((prev) => {
      const newAllergies = [...prev.allergies, val]; // Create a new array with existing allergies and the new one
      console.log(newAllergies); // Log the updated allergies
      return { ...prev, allergies: newAllergies }; // Return the updated patientDetail
    });
    setVal(""); // Reset the input value
  };

  const addConditions = (e) => {
    e.preventDefault(); // Prevent default form submission
    setPatientDetail((prev) => {
      const newConditions = [...prev.medicalConditions, condition]; // Create a new array with existing allergies and the new one
      console.log(newConditions); // Log the updated allergies
      return { ...prev, medicalConditions: newConditions }; // Return the updated patientDetail
    });
    setCondition(""); // Reset the input value
  };

  return (
    <div className="p-8 bg-white rounded-lg flex justify-center w-full">
     
      <form
        className="w-[80%] p-8 border border-2 rounded-lg bg-gray-100 shadow-inner shadow-md"
        onSubmit={handleSubmit}
      >
         <p className="text-red-800 text-center">ensure to type in your details carefully as we do not have an option to edit some of them</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="mt-2">
            <label className="font-bold homee text-gray-700" htmlFor="fullName">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              value={patientDetail.fullName || ""}
              className="box w-full p-3 rounded-lg bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              // disabled={!!patientDetail.fullName}
              onChange={handleChange}
            />
          </div>
          <div className="mt-2">
            <label
              className="font-bold homee text-gray-700"
              htmlFor="phoneNumber"
            >
              Phone Number
            </label>
            <input
              type="number"
              id="phoneNumber"
              value={patientDetail.phoneNumber || ""}
              className="box w-full p-3 rounded-lg bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              // disabled={!!patientDetail.phoneNumber}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="mt-2">
            <label className="font-bold homee text-gray-700" htmlFor="genotype">
              Genotype
            </label>
            <select
              id="genotype"
              onChange={handleChange}
              value={patientDetail.genotype || "null"}
              className="box p-3 rounded-lg bg-white shadow-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              // disabled={!!patientDetail.genotype}
            >
              <option value="">Select Genotype</option>
              {["AA", "AS", "SS", "AC", "SC", "CC"].map((genotype) => (
                <option key={genotype} value={genotype}>
                  {genotype}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-2">
            <label
              className="font-bold homee text-gray-700"
              htmlFor="bloodGroup"
            >
              Blood Group
            </label>
            <select
              id="bloodGroup"
              onChange={handleChange}
              value={patientDetail.bloodGroup || ""}
              className="box p-3 rounded-lg bg-white shadow-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              // disabled={!!patientDetail.bloodGroup}
            >
              <option value="">Select Blood Group</option>
              {["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"].map(
                (bloodGroup) => (
                  <option key={bloodGroup} value={bloodGroup}>
                    {bloodGroup}
                  </option>
                )
              )}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="mt-2">
            <label className="font-bold homee text-gray-700" htmlFor="weight">
              Weight (kg)
            </label>
            <input
              type="number"
              id="weight"
              className="box p-3 rounded-lg bg-white shadow-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              // disabled={!!patientDetail.weight}
              value={patientDetail.weight || "null"}
              onChange={handleChange}
            />
          </div>
          <div className="mt-2">
            <label className="font-bold homee text-gray-700" htmlFor="height">
              Height (cm)
            </label>
            <input
              type="number"
              id="height"
              value={patientDetail.height || "null"}
              className="box p-3 rounded-lg bg-white shadow-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              // disabled={!!patientDetail.height}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="mt-2">
            <label className="font-bold homee" htmlFor="allergies">
              Allergies
            </label>
            <br />
            <input
              type="text"
              id="allergies"
              className="box p-3 rounded-lg bg-non w-[50%]"
              onChange={(e) => {
                setVal(e.target.value);
              }}
              value={val}
            />
            <button
              type="button"
              onClick={addAllergies}
              className="ml-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            >
              Add
            </button>
          </div>
          <div className="mt-2">
            <label className="font-bold homee" htmlFor="medcondition">
              Medical Conditions
            </label>
            <br />
            <input
              type="text"
              id="medcondition"
              className="box p-3 rounded-lg bg-non w-[50%]"
              onChange={(e) => {
                setCondition(e.target.value);
              }}
              value={condition}
            />
            <button
              type="button"
              onClick={addConditions}
              className="ml-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            >
              Add
            </button>
          </div>
        </div>
        <button
          type="submit" // Ensure this is set to submit
          className="p-3 border-gray-300 border-2 text-center w-full mt-4 homee"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default DataForm;
