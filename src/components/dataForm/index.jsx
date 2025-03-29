import React, { useEffect, useState } from "react";
import fetchPatientDetails from "../fetchPatientDetails";
import { useUserAuth } from "../../assets/context/userAuthContext";
import { updatePatientDetails } from "../../repository/post.service";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { MdCancel } from "react-icons/md";

const DataForm = () => {
  const { user, patientDetail, setPatientDetail, editProfile, setEditProfile } =
    useUserAuth();

  useEffect(() => {
    fetchPatientDetails(user, setPatientDetail, null);
  }, [user]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setPatientDetail((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePatientDetails(patientDetail);
      setEditProfile(false);
      // navigate("/profile");
    } catch (err) {
      console.log(err);
    }

    console.log(patientDetail);
  };

  const deleteAllergy = (allergyName) => {
    setPatientDetail((prevDetail) => ({
      ...prevDetail,
      allergies: prevDetail.allergies.filter(
        (allergy) => allergy !== allergyName
      ), // Correctly filter allergies
    }));
  };

  const deleteConditions = (conditionName) => {
    setPatientDetail((prev) => ({
      ...prev,
      medicalConditions: prev.medicalConditions.filter(
        (cond) => cond !== conditionName
      ),
    }));
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

  const location = useLocation();
  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate(-1);
  };

  return (
    <div
      className={`p-8  rounded-lg flex justify-center w-200 bg-white top-0 z-50 absolute left-100 ${
        editProfile ? "block" : "hidden"
      }`}
    >
      <form
        className="w-170 p-8 border border-2 rounded-lg bg-gray-100 shadow-inner shadow-md relative"
        onSubmit={handleSubmit}
      >
        <button
          className="absolute top-0 left-0 view text-white font-bold p-1 text-2xl"
          onClick={() => {
            setEditProfile(false);
          }}
        >
          <MdCancel />
        </button>
        <p className="text-red-800 text-center">
          ensure to submit the form for proper update
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="mt-2">
            <label className="font-bold homee text-gray-700" htmlFor="fullName">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              value={patientDetail.fullName || ""}
              className="box w-full p-1 rounded-lg bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="box w-full p-1 rounded-lg bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="box p-1 rounded-lg bg-white shadow-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="box p-1 rounded-lg bg-white shadow-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="box p-1 rounded-lg bg-white shadow-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="box p-1 rounded-lg bg-white shadow-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              // disabled={!!patientDetail.height}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <div className="mt-2">
              <label className="font-bold homee" htmlFor="allergies">
                Allergies
              </label>
              <br />
              <input
                type="text"
                id="allergies"
                className="box p-1 rounded-lg bg-non w-[50%]"
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
            <div className="mt-4">
              <h2 className="text-center font-bold">Allergies List</h2>
              {patientDetail.allergies.length > 0 ? (
                <ol className="list-decimal list-inside">
                  {patientDetail.allergies.map((allergy, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center mb-2"
                    >
                      <span>{allergy}</span>
                      <button
                        type="button"
                        className="shadow-inner shadow-md p-2 bg-red-500 text-white rounded"
                        onClick={() => {
                          deleteAllergy(allergy);
                        }}
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="text-center text-gray-500">
                  No allergies listed.
                </p>
              )}
            </div>
          </div>

          <div className="mt-2">
            <div className="">
              <label className="font-bold homee" htmlFor="medcondition">
                Medical Conditions
              </label>
              <br />
              <input
                type="text"
                id="medcondition"
                className="box p-1 rounded-lg bg-non w-[50%]"
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
            <div className="mt-4">
              <h2 className="text-center font-bold">Medical Conditions</h2>
              {patientDetail.medicalConditions.length > 0 ? (
                <>
                  <ol className="list-decimal list-inside">
                    {patientDetail.medicalConditions.map((condition, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center mb-2"
                      >
                        <span>{condition}</span>
                        <button
                          type="button"
                          className="shadow-inner shadow-md p-2 bg-red-500 text-white rounded"
                          onClick={() => deleteConditions(condition)}
                        >
                          Delete
                        </button>
                      </li>
                    ))}
                  </ol>
                </>
              ) : (
                <p className="text-center text-gray-500">
                  No medical conditions listed.
                </p>
              )}
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="p-1 border-gray-300 border-2 text-center w-full mt-4 homee"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default DataForm;
