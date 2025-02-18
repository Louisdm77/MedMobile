import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import { FaDotCircle } from "react-icons/fa";
import { GiCheckMark } from "react-icons/gi";
import { useUserAuth } from "../../assets/context/userAuthContext";
import { createPatientData } from "../../repository/post.service";
import { getAuth } from "@firebase/auth";

const SignUp = () => {
  const { signUp, user, data, setData } = useUserAuth();
  const navigate = useNavigate(); // Add useNavigate for redirection
  const [signupPage, setSignupPage] = useState(1);
  const [progress, setProgress] = useState(0);
  const [errors, setErrors] = useState({});
  const initialValue = {
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [userInfo, setUserInfo] = useState(initialValue);

  const [dataList, setDataList] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateFields()) {
      try {
        // Check if the email is already in use
        const signInMethods = await fetchSignInMethodsForEmail(
          getAuth(),
          userInfo.email
        );
        if (signInMethods.length > 0) {
          setErrors({
            ...errors,
            signupError: "User with this email already exists",
          });
          return; // Stop further execution
        }

        // Proceed to sign up the user
        const response = await signUp(userInfo.email, userInfo.password);
        const user = getAuth().currentUser;

        if (user) {
          const newPatientData = {
            ...data,
            email: userInfo.email,
            uid: user.uid,
          };
          setData(newPatientData);
          await createPatientData(newPatientData);
          console.log("Signup successful:", response);
          navigate("/settings");
        } else {
          setErrors({
            ...errors,
            signupError:
              "User not authenticated, cannot proceed with data save.",
          });
        }
      } catch (err) {
        console.log("Signup error:", err);
        if (err.code === "auth/invalid-email") {
          setErrors({ ...errors, signupError: "Invalid email address" });
        } else if (err.code === "auth/weak-password") {
          setErrors({ ...errors, signupError: "Password not strong enough" });
        } else {
          setErrors({
            ...errors,
            signupError: "Something went wrong. Please try again",
          });
        }
      }
    }
  };

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
    } else if (signupPage === 4) {
      if (userInfo.password.length < 6)
        newErrors.password = "Password not strong enough";
      if (userInfo.confirmPassword !== userInfo.password)
        newErrors.confirmPassword = "Passwords don't match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextPage = (e) => {
    e.preventDefault();
    if (validateFields()) {
      if (signupPage < 4) {
        setSignupPage((prev) => prev + 1);
        setProgress((prev) => prev + 25); // Adjusted for 4 pages
      }
    }
  };

  const handlePrevPage = (e) => {
    e.preventDefault();
    if (signupPage > 1) {
      setSignupPage((prev) => prev - 1);
      setProgress((prev) => prev - 25); // Adjusted for 4 pages
    }
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  const renderPage = () => {
    switch (signupPage) {
      case 1:
        return (
          <div>
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
            </div>
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
                onChange={(e) =>
                  setData(
                    { ...data, email: e.target.value },
                    setUserInfo({ ...userInfo, email: e.target.value })
                  )
                }
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
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
          <div>
            <div className="grid">
              <label htmlFor="password" className="font-bold">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="******"
                value={userInfo.password}
                className="box rounded-lg w-full p-3"
                onChange={(e) =>
                  setUserInfo({ ...userInfo, password: e.target.value })
                }
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
            <div className="grid mt-2">
              <label htmlFor="confirmPassword" className="font-bold">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="......"
                className="box rounded-lg w-full p-3"
                value={userInfo.confirmPassword}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, confirmPassword: e.target.value })
                }
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
              )}
            </div>
            <button
              type="button"
              className="cont w-full rounded text-center bg-white border border-2 border-black mt-8 p-2"
              onClick={handleSubmit}
            >
              Sign Up
            </button>
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
          <img
            src="https://s3-alpha-sig.figma.com/img/fc06/ca65/d0fc244a6615f4494c3fb4cbba05c3a2?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Ir50xqZ4g-Qrc1K7kQb898g~2K8ME3tIVjksM67HdEdZNz1KqLglzoxsGAFqxVkc~hcRJiDGaXO9fmCwpl3c6L~Y3MpvnU~DE3j-yPGD-CXt0xk~N2PTCj1qS~sNZAQDlhYLcgCjnkeZe7B4fSd8tycEyxnOXtfupnM-iF1LiJGglvwp15hnuDUR-qkxWtpV5tvu4PwOCLUofTy45hqdlZqc6FMx3FrJgjYxMkK96wIaMIBXlti1PNEZCv~abmXS0F3pEgW9pReD7CRTRX8tqR2vydL1m1auG54NqvlbgmGT6NbgMEicJzhlXNX5XGLudfW9w-htO1J2-9vewnE5tw"
            className="w-full"
          />
          <div className="text-start mx-16">
            <h3 className="font-extrabold text-4xl mt-8 p-2">Medmobile</h3>
            <p className="font-medium text-2xl">
              Join us today for seamless healthcare access!
            </p>
          </div>
        </div>
        <div>
          <div className="shadow-2xl h-auto w-full m-auto my-auto p-4 py-2  rounded">
            <h2 className="text-center mt-3 mb-8 text-4xl font-bold">
              Sign Up
            </h2>
            <div>
              {errors.signupError && (
                <p className="text-red-500 text-sm">{errors.signupError}</p>
              )}
            </div>
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
                  <IoArrowBack /> &nbsp; <span>Back</span>
                </button>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-center mt-4 font-medium">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-800 underline">
                log in
              </Link>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
