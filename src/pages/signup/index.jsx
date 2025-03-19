import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import { FaDotCircle } from "react-icons/fa";
import { GiCheckMark } from "react-icons/gi";
import { useUserAuth } from "../../assets/context/userAuthContext";
import { createPatientData } from "../../repository/post.service";
import { getAuth, fetchSignInMethodsForEmail } from "@firebase/auth";
import home from "../../assets/images/home.png";
import OtpInput from "react18-input-otp";

const SignUp = () => {
  const { signInWithPhone, verifyCode, data, setData } = useUserAuth();
  const navigate = useNavigate();
  const [signupPage, setSignupPage] = useState(1);
  const [progress, setProgress] = useState(0);
  const [errors, setErrors] = useState({});
  const [otp, setOtp] = useState(""); // For OTP input in step 4

  const validateFields = () => {
    const newErrors = {};
    if (signupPage === 1) {
      if (!data.fullName) newErrors.fullName = "Full Name is required";
      if (!data.phoneNumber) newErrors.phoneNumber = "Phone Number is required";
      if (!data.email) newErrors.email = "Email Address is required";
    } else if (signupPage === 2) {
      if (!data.dob) newErrors.dob = "Date of Birth is required";
      if (!data.hospital) newErrors.hospital = "Hospital is required";
      if (!data.hospitalNum)
        newErrors.hospitalNum = "Hospital Number is required";
    } else if (signupPage === 3) {
      if (!data.emergencyContact)
        newErrors.emergencyContact = "Emergency Contact Name is required";
      if (!data.emergencyContactNum)
        newErrors.emergencyContactNum = "Emergency Contact Number is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextPage = async (e) => {
    e.preventDefault();
    if (validateFields()) {
      if (signupPage === 1) {
        // Trigger phone authentication after collecting phone number
        try {
          const fullNum = `+234${data.phoneNumber}`;
          await signInWithPhone(fullNum);
          setSignupPage(4); // Jump to OTP verification
          setProgress(100); // Set progress to 100% for final step
        } catch (error) {
          setErrors({
            ...errors,
            phoneError: "Error sending OTP: " + error.message,
          });
        }
      } else if (signupPage < 3) {
        setSignupPage((prev) => prev + 1);
        setProgress((prev) => prev + 33); // Adjusted for 3 steps + OTP
      }
    }
  };

  const handlePrevPage = (e) => {
    e.preventDefault();
    if (signupPage === 4) {
      setSignupPage(1); // Go back to first page from OTP
      setProgress(0);
    } else if (signupPage > 1) {
      setSignupPage((prev) => prev - 1);
      setProgress((prev) => prev - 33);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const user = await verifyCode(otp);
      const newPatientData = {
        ...data,
        uid: user.uid,
      };
      setData(newPatientData);
      await createPatientData(newPatientData);
      navigate("/"); // Redirect to home after successful signup
    } catch (error) {
      setErrors({ ...errors, otpError: "Invalid OTP: " + error.message });
    }
  };

  const handleResendOtp = async () => {
    try {
      const fullNum = `+234${data.phoneNumber}`;
      await signInWithPhone(fullNum);
      alert("OTP resent!");
    } catch (error) {
      setErrors({
        ...errors,
        otpError: "Error resending OTP: " + error.message,
      });
    }
  };

  const renderPage = () => {
    switch (signupPage) {
      case 1:
        return (
          <div>
            <div className="grid mt-2">
              <label htmlFor="name" className="font-bold">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="John Doe Smith"
                className="box rounded-lg w-full p-3"
                value={data.fullName}
                onChange={(e) => setData({ ...data, fullName: e.target.value })}
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm">{errors.fullName}</p>
              )}
            </div>
            <div className="grid mt-2">
              <label htmlFor="email" className="font-bold">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="m@example.com"
                className="box rounded-lg w-full p-3"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            <div className="grid">
              <label htmlFor="phone-select" className="font-bold">
                Phone Number
              </label>
              <div className="flex justify-between items-center">
                <select
                  name="phone"
                  id="phone-select"
                  className="box rounded-lg w-[26%] font-bold p-3 text-md"
                >
                  <option value="+234">+234</option>
                </select>
                <input
                  id="phone"
                  type="number"
                  placeholder="0812345678"
                  className="box rounded-lg w-[73%] p-3 text-md"
                  value={data.phoneNumber}
                  onChange={(e) =>
                    setData({ ...data, phoneNumber: e.target.value })
                  }
                />
              </div>
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
              )}
              {errors.phoneError && (
                <p className="text-red-500 text-sm">{errors.phoneError}</p>
              )}
            </div>
            <button
              type="button"
              className="cont box w-full rounded text-center border border-2 border-black mt-4 p-2"
              onClick={handleNextPage}
            >
              Continue
            </button>
          </div>
        );
      case 2:
        return (
          <div>
            <div className="mt-2">
              <label htmlFor="dob" className="font-bold block">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                id="dob"
                value={data.dob}
                className="box w-full p-3 rounded-lg"
                onChange={(e) => setData({ ...data, dob: e.target.value })}
              />
              {errors.dob && (
                <p className="text-red-500 text-sm">{errors.dob}</p>
              )}
            </div>
            <div className="mt-2">
              <label htmlFor="hospital" className="font-bold">
                Hospital
              </label>
              <select
                name="hospital"
                id="hospital"
                value={data.hospital}
                className="box w-full p-3 rounded-lg"
                onChange={(e) => setData({ ...data, hospital: e.target.value })}
              >
                <option value="">Select Hospital</option>
                <option value="medhealth">Medhealth</option>
                <option value="medhealth2">Medhealth2</option>
              </select>
              {errors.hospital && (
                <p className="text-red-500 text-sm">{errors.hospital}</p>
              )}
            </div>
            <div className="mt-2">
              <label htmlFor="hospitalNum" className="font-bold">
                Hospital Num
              </label>
              <input
                type="number"
                name="hospitalNum"
                id="hospitalNum"
                className="box w-full p-3 rounded-lg"
                value={data.hospitalNum}
                onChange={(e) =>
                  setData({ ...data, hospitalNum: e.target.value })
                }
              />
              {errors.hospitalNum && (
                <p className="text-red-500 text-sm">{errors.hospitalNum}</p>
              )}
            </div>
            <button
              type="button"
              className="cont w-full rounded-lg text-center bg-white border border-2 border-black mt-4 p-2"
              onClick={handleNextPage}
            >
              Continue
            </button>
          </div>
        );
      case 3:
        return (
          <div>
            <div className="grid">
              <label htmlFor="emergencyname" className="font-bold">
                Emergency Contact Name
              </label>
              <input
                id="emergencyname"
                type="text"
                placeholder="John Doe Smith"
                className="box rounded-lg w-full p-3"
                value={data.emergencyContact}
                onChange={(e) =>
                  setData({ ...data, emergencyContact: e.target.value })
                }
              />
              {errors.emergencyContact && (
                <p className="text-red-500 text-sm">
                  {errors.emergencyContact}
                </p>
              )}
            </div>
            <div className="grid mt-2">
              <label htmlFor="emergencyphone-select" className="font-bold">
                Emergency Phone Number
              </label>
              <div className="flex justify-between items-center">
                <select
                  name="phone"
                  id="emergencyphone-select"
                  className="box rounded-lg w-[26%] font-bold p-3 text-md"
                >
                  <option value="+234">+234</option>
                </select>
                <input
                  id="phone"
                  type="number"
                  placeholder="123-456-7890"
                  value={data.emergencyContactNum}
                  className="box rounded-lg w-[73%] p-3 text-md"
                  onChange={(e) =>
                    setData({ ...data, emergencyContactNum: e.target.value })
                  }
                />
              </div>
              {errors.emergencyContactNum && (
                <p className="text-red-500 text-sm">
                  {errors.emergencyContactNum}
                </p>
              )}
            </div>
            <div className="grid mt-2">
              <label htmlFor="insurance" className="font-bold">
                Insurance Provider
              </label>
              <input
                id="insurance"
                type="text"
                className="box rounded-lg w-full p-3"
                value={data.insuranceProvider}
                onChange={(e) =>
                  setData({ ...data, insuranceProvider: e.target.value })
                }
              />
            </div>
            <button
              type="button"
              className="cont w-full rounded-lg text-center bg-white border border-2 border-black mt-4 p-2"
              onClick={handleNextPage}
            >
              Continue
            </button>
          </div>
        );
      case 4:
        return (
          <div className="w-full p-12 rounded-xl">
            <div className="shadow-2xl w-full m-auto my-auto p-4 py-6 mt-10 rounded-xl">
              <h2 className="text-3xl font-bold text-center mt-10">
                OTP VERIFICATION
              </h2>
              <p className="text-center mt-10">
                Enter the 6-digit code sent to your phone
              </p>
              <form onSubmit={handleVerifyOtp}>
                <div className="mt-6 flex justify-center">
                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    shouldAutoFocus
                    isInputNum
                    inputStyle={{
                      backgroundColor: "#d9d9d9",
                      width: "3rem",
                      height: "3rem",
                      margin: "0 0.5rem",
                      fontSize: "2rem",
                      border: "2px solid #ccc",
                      borderRadius: "8px",
                      textAlign: "center",
                    }}
                  />
                </div>
                {errors.otpError && (
                  <p className="text-red-500 text-sm text-center mt-2">
                    {errors.otpError}
                  </p>
                )}
                <div className="text-center mt-4 border-none">
                  <p>
                    Didn't get a code?{" "}
                    <button
                      type="button"
                      className="underline"
                      onClick={handleResendOtp}
                    >
                      Resend
                    </button>
                  </p>
                </div>
                <div className="mt-8">
                  <button
                    type="submit"
                    className="cont border border-gray-900 font-bold py-3 px-4 w-full mb-10 rounded-xl"
                  >
                    Verify
                  </button>
                </div>
              </form>
            </div>
            <div className="mt-4 flex items-center w-full text-center">
              <Link
                to="/login"
                className="text-lg font-medium capitalize text-center w-full"
              >
                Already have an account?{" "}
                <span className="text-blue-700 underline">Log in</span>
              </Link>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="homee p-6">
      <div className="md:grid md:grid-cols-2 gap-2">
        <div className="text-center hidden md:block">
          <img src={home} className="w-full" />
          <div className="text-start mx-16">
            <h3 className="font-extrabold text-4xl mt-8 p-2">Medmobile</h3>
            <p className="font-medium text-2xl">
              Join us today for seamless healthcare access!
            </p>
          </div>
        </div>
        <div>
          <div className="h-auto w-full m-auto my-auto p-4 py-2 rounded">
            <h2 className="text-center mt-3 mb-8 text-4xl font-bold">
              Sign Up
            </h2>
            <div className="px-5 mb-5">
              <ProgressBar percent={progress}>
                {[1, 2, 3, 4].map((step, index) => (
                  <Step key={index}>
                    {({ accomplished }) => (
                      <div
                        className={`indexedStep ${
                          accomplished ? "accomplished" : ""
                        }`}
                      >
                        <div className="h-5 w-5 font-bold bg-white flex items-center justify-center text-4xl">
                          {signupPage === step ? (
                            <FaDotCircle />
                          ) : accomplished ? (
                            <GiCheckMark />
                          ) : (
                            <span className="text-lg">{step}</span>
                          )}
                        </div>
                      </div>
                    )}
                  </Step>
                ))}
              </ProgressBar>
            </div>
            <div className={`${signupPage !== 4 ? "p-6" : "p-12"}`}>
              {renderPage()}
              <div className="text-center flex justify-center items-center font-medium">
                <button
                  className="flex items-center mt-6 text-xl"
                  onClick={handlePrevPage}
                >
                  <IoArrowBack /> <span>Back</span>
                </button>
              </div>
            </div>
          </div>
          {signupPage !== 4 && (
            <div>
              <h2 className="text-center mt-4">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-800 underline font-bold">
                  Log in
                </Link>
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
