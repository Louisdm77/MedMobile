import React from "react";

const DataForm = () => {
  const fjhsh = {
    bloodGroup: "",
    genotype: "",
    weight: "",
    height: "",
    allergies: [],
    medicalConditions: [],
  };
  return (
    <div className="p-8 bg-white rounded-lg flex justify-center w-full">
      <form className="w-[80%] p-8 border border-2 rounded-lg bg-gray-100 shadow-inner shadow-md">
        <div className="grid grid-cols-2 gap-4">
          <div className="mt-2">
            <label className="font-bold homee text-gray-700" htmlFor="fullName">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              className="box w-full p-3 rounded-lg bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="box w-full p-3 rounded-lg bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="mt-2">
            <label className="font-bold homee text-gray-700" htmlFor="genotype">
              Genotype
            </label>
            <select
              name="genotype"
              id="genotype"
              className="box p-3 rounded-lg bg-white shadow-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Genotype</option>
              <option value="AA">AA</option>
              <option value="AS">AS</option>
              <option value="SS">SS</option>
              <option value="AC">AC</option>
              <option value="SC">SC</option>
              <option value="CC">CC</option>
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
              name="bloodGroup"
              id="bloodGroup"
              className="box p-3 rounded-lg bg-white shadow-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Blood Group</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
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
            />
          </div>
          <div className="mt-2">
            <label className="font-bold homee text-gray-700" htmlFor="height">
              Height (cm)
            </label>
            <input
              type="number"
              id="height"
              className="box p-3 rounded-lg bg-white shadow-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            />
            <button className="ml-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
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
            />
            <button className="ml-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DataForm;
