import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";

const SignUp = () => {
  const [signupPage, setSignupPage] = useState(1);
  const [progress, setProgress] = useState(0);
  const handleNextPage = () => {
    if (signupPage < 3) {
      setSignupPage((prev) => prev + 1);
      setProgress((prev) => prev + 50);
    }
  };
  const handlePrevPage = () => {
    if (signupPage > 1) {
      setSignupPage((prev) => prev - 1);
      setProgress((prev) => prev - 50);
    } else {
      alert("You have reached the initial step of the signup process.");
      setSignupPage(1);
      setProgress(0);
    }
  };

  const renderPage = () => {
    switch (signupPage) {
      case 1:
        return (
          <div className="md:hidden p-2">
            <div>
              <div>
                <form>
                  <div className="grid">
                    <label htmlFor="name" className="font-bold">
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="John Doe Smith"
                      className="bg-gray-200 rounded w-full p-3"
                    />
                  </div>
                  <div className="grid mt-2">
                    <label htmlFor="phone-select" className="font-bold">
                      Phone Number
                    </label>
                    <div className="flex justify-between items-center">
                      <select
                        name="phone"
                        id="phone-select"
                        className="bg-gray-200 rounded w-[26%] font-bold p-3 text-md"
                      >
                        <option value="+234">+234</option>
                      </select>
                      <input
                        id="phone"
                        type="tel"
                        placeholder="123-456-7890"
                        className="bg-gray-200 rounded w-[73%] p-3 text-md"
                      />
                    </div>
                  </div>{" "}
                  <div className="grid mt-2">
                    <label htmlFor="insurance" className="font-bold">
                      Email Address
                    </label>
                    <input
                      id="insurance"
                      type="email"
                      placeholder="m@example.com"
                      className="bg-gray-200 rounded w-full p-3"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded text-center bg-white border border-2 border-black mt-4 p-2"
                    onClick={handleNextPage}
                  >
                    Continue
                  </button>
                </form>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <form>
            <div className="mt-2">
              <label htmlFor="dob" className="font-bold block">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                id="dob"
                className="items-center text-lg bg-gray-200 w-full p-3"
              />
            </div>
            <div className="mt-2">
              <label htmlFor="hospital" className="font-bold">
                Hospital
              </label>
              <select
                name="hospital"
                id="hospital"
                className="items-center text-lg bg-gray-200 w-full p-3"
              >
                <option value="medhealth">Medhealth</option>
                <option value="medhealth2">Medhealth2</option>
              </select>
            </div>
            <div className="mt-2">
              <label htmlFor="hospitalnum" className="font-bold mt-2">
                Hospital Num
              </label>
              <input
                type="number"
                name="hospitalnum"
                id="hospitalnum"
                className="items-center text-lg bg-gray-200 w-full p-3"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded text-center bg-white border border-2 border-black mt-4 p-2"
              onClick={handleNextPage}
            >
              Continue
            </button>
          </form>
        );
      case 3:
        return (
          <form>
            <div className="grid">
              <label htmlFor="emergencyname" className="font-bold">
                Emergency Contact Name
              </label>
              <input
                id="emergencyname"
                type="text"
                placeholder="John Doe Smith"
                className="bg-gray-200 rounded w-full p-3"
              />
            </div>
            <div className="grid mt-2">
              <label htmlFor="emergencyphone-select" className="font-bold">
                Emergency Phone Number
              </label>
              <div className="flex justify-between items-center">
                <select
                  name="phone"
                  id="emergencyphone-select"
                  className="bg-gray-200 rounded w-[26%] font-bold p-3 text-md"
                >
                  <option value="+234">+234</option>
                </select>
                <input
                  id="phone"
                  type="tel"
                  placeholder="123-456-7890"
                  className="bg-gray-200 rounded w-[73%] p-3 text-md"
                />
              </div>
            </div>{" "}
            <div className="grid mt-2">
              <label htmlFor="insurance" className="font-bold">
                Insurance Provider
              </label>
              <input
                id="insurance"
                type="text"
                placeholder=""
                className="bg-gray-200 rounded w-full p-3"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded text-center bg-white border border-2 border-black mt-4 p-2"
            >
              Sign Up
            </button>
          </form>
        );
      default:
        return null;
    }
  };
  return (
    <div className="md:hidden">
      <div>
        <h1 className="font-bold text-center text-4xl mt-4">MedMobile</h1>
      </div>
      <div>
        <div className="bg-gray-100 h-auto w-full m-auto my-auto p-4 py-6 mt-10 rounded">
          <h2 className="text-center mt-3 mb-8 text-2xl font-bold">Sign Up</h2>
          <div className="px-5 mb-5">
            <ProgressBar percent={progress}>
              <Step>
                {({ accomplished, index }) => (
                  <div
                    className={`indexedStep ${
                      accomplished ? "accomplished" : ""
                    }`}
                  >
                    <div className="h-5 w-5 rounded-full bg-blue-500"></div>
                  </div>
                )}
              </Step>
              <Step>
                {({ accomplished, index }) => (
                  <div
                    className={`indexedStep ${
                      accomplished ? "accomplished" : ""
                    }`}
                  >
                    <div className="h-5 w-5 rounded-full bg-blue-500"></div>
                  </div>
                )}
              </Step>
              <Step>
                {({ accomplished, index }) => (
                  <div
                    className={`indexedStep ${
                      accomplished ? "accomplished" : ""
                    }`}
                  >
                    <div className="h-5 w-5 rounded-full bg-blue-500"></div>
                  </div>
                )}
              </Step>
            </ProgressBar>
          </div>

          <div className=" p-2">{renderPage()}</div>
          <button
            className="flex items-center mt-6 text-lg "
            onClick={handlePrevPage}
          >
            <IoArrowBack /> &nbsp; <span>Back</span>
          </button>
        </div>
      </div>
      <div>
        <h2 className="text-start">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-800 underline">
            login
          </Link>
        </h2>
      </div>
    </div>
  );
};

export default SignUp;
