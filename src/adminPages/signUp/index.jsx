import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../assets/context/userAuthContext";
import { db } from "../../assets/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import { FaDotCircle } from "react-icons/fa";
import { GiCheckMark } from "react-icons/gi";
import home from "../../assets/images/home.png";
import { collection, addDoc } from "firebase/firestore";
import { updateProfile } from "@firebase/auth";

const AdminSignUp = () => {
  const { signUp, user, adminInfo, setAdminInfo } = useUserAuth();
  const navigate = useNavigate();

  const [adminInformation, setAdminInformation] = useState({
    email: "",
    password: "",
    fullName: "",
    specialty: "",
    docRegNum: "",
    uid: "",
  });

  const [errorMessages, setErrorMessages] = useState({});
  const [signupPage, setSignupPage] = useState(1);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    console.log("Current user:", user);
  }, [user]);

  useEffect(() => {
    console.log("Current adminInfo:", adminInfo);
  }, [adminInfo]);
  useEffect(() => {
    console.log("Admin information:", adminInformation);
  }, [adminInformation]);

  const validateFields = () => {
    const newErrors = {};
    if (signupPage === 1) {
      if (!adminInformation.fullName)
        newErrors.fullName = "Full Name is required.";
      if (!adminInformation.email)
        newErrors.email = "Email Address is required.";
    } else if (signupPage === 2) {
      if (!adminInformation.password)
        newErrors.password = "Password is required.";
      if (!adminInformation.specialty)
        newErrors.specialty = "Doctor Specialty is required.";
      if (!adminInformation.docRegNum)
        newErrors.docRegNum = "Doctor Registration Number is required.";
    }
    setErrorMessages(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextPage = (e) => {
    e.preventDefault();
    if (validateFields()) {
      setSignupPage(2);
      setProgress(50);
    }
  };

  const handlePrevPage = (e) => {
    e.preventDefault();
    if (signupPage === 2) {
      setSignupPage(1);
      setProgress(0);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (validateFields()) {
      try {
        // Sign up the admin user with Firebase Authentication
        const userCredential = await signUp(
          adminInformation.email,
          adminInformation.password
        );

        // Access the user object
        const user = userCredential.user;

        if (user) {
          setAdminInformation((prev) => ({
            ...prev,
            uid: user.uid,
          }));

          // Prepare admin data for Firestore
          const adminData = {
            fullName: adminInformation.fullName,
            email: adminInformation.email,
            specialty: adminInformation.specialty,
            docRegNum: adminInformation.docRegNum,
            uid: user.uid, // Store UID as a field
            createdAt: new Date().toISOString(),
          };

          await updateProfile(user, {
            displayName: adminInformation.fullName,
          });
          // Update the adminInfo context
          setAdminInfo(adminData); // Ensure this is called with the correct adminData

          // Create a document reference using doc
          const docRef = doc(db, "admindata", user.uid);
          await setDoc(docRef, adminData); // Use adminData for Firestore

          console.log("Document created with ID:", docRef.id);
          console.log("adminData:", adminData); // Log the new adminData
          console.log("adminInfo:", adminInfo);
          console.log("userCredential:", userCredential);
          navigate("/admin/home");
        }
      } catch (err) {
        console.log("Error:", err);
        handleFirebaseError(err);
      }
    }
  };
  const handleFirebaseError = (err) => {
    const newErrors = {};
    switch (err.code) {
      case "auth/email-already-in-use":
        newErrors.email = "This email is already registered.";
        break;
      case "auth/invalid-email":
        newErrors.email = "Invalid email format.";
        break;
      case "auth/weak-password":
        newErrors.password = "Password should be at least 6 characters.";
        break;
      default:
        newErrors.general =
          err.message || "An error occurred. Please try again.";
    }
    setErrorMessages(newErrors);
  };

  const renderPage = () => {
    switch (signupPage) {
      case 1:
        return (
          <div>
            <div className="grid mt-2">
              <label htmlFor="fullName" className="font-bold">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                placeholder="Dr. John Doe"
                className="box rounded-lg w-full p-3"
                value={adminInformation.fullName}
                onChange={(e) =>
                  setAdminInformation({
                    ...adminInformation,
                    fullName: e.target.value,
                  })
                }
              />
              {errorMessages.fullName && (
                <p className="text-red-500 text-sm">{errorMessages.fullName}</p>
              )}
            </div>
            <div className="grid mt-2">
              <label htmlFor="email" className="font-bold">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="admin@example.com"
                className="box rounded-lg w-full p-3"
                value={adminInformation.email}
                onChange={(e) =>
                  setAdminInformation({
                    ...adminInformation,
                    email: e.target.value,
                  })
                }
              />
              {errorMessages.email && (
                <p className="text-red-500 text-sm">{errorMessages.email}</p>
              )}
            </div>
            <button
              type="button"
              className="cont box w-full rounded text-center border border-2 border-black mt-4 p-2"
              onClick={handleNextPage}
            >
              Next
            </button>
          </div>
        );
      case 2:
        return (
          <div>
            <div className="grid mt-2">
              <label htmlFor="password" className="font-bold">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="********"
                className="box rounded-lg w-full p-3"
                value={adminInformation.password}
                onChange={(e) =>
                  setAdminInformation({
                    ...adminInformation,
                    password: e.target.value,
                  })
                }
              />
              {errorMessages.password && (
                <p className="text-red-500 text-sm">{errorMessages.password}</p>
              )}
            </div>
            <div className="grid mt-2">
              <label htmlFor="specialty" className="font-bold">
                Doctor Specialty
              </label>
              <select
                id="specialty"
                className="box rounded-lg w-full p-3"
                value={adminInformation.specialty}
                onChange={(e) =>
                  setAdminInformation({
                    ...adminInformation,
                    specialty: e.target.value,
                  })
                }
              >
                <option value="">Select a specialty</option>
                <option value="cardiologist">Cardiologist</option>
                <option value="dermatologist">Dermatologist</option>
                <option value="pediatrician">Pediatrician</option>
                <option value="orthopedic">Orthopedic Surgeon</option>
                <option value="neurologist">Neurologist</option>
                <option value="gynecologist">Gynecologist</option>
                <option value="psychiatrist">Psychiatrist</option>
                <option value="general_practitioner">
                  General Practitioner
                </option>
                <option value="radiologist">Radiologist</option>
                <option value="endocrinologist">Endocrinologist</option>
              </select>
              {errorMessages.specialty && (
                <p className="text-red-500 text-sm">
                  {errorMessages.specialty}
                </p>
              )}
            </div>
            <div className="grid mt-2">
              <label htmlFor="docRegNum" className="font-bold">
                Doctor Registration Number
              </label>
              <input
                id="docRegNum"
                type="text"
                placeholder="e.g., MDCN12345"
                className="box rounded-lg w-full p-3"
                value={adminInformation.docRegNum}
                onChange={(e) =>
                  setAdminInformation({
                    ...adminInformation,
                    docRegNum: e.target.value,
                  })
                }
              />
              {errorMessages.docRegNum && (
                <p className="text-red-500 text-sm">
                  {errorMessages.docRegNum}
                </p>
              )}
            </div>
            {errorMessages.general && (
              <p className="text-red-500 text-sm mt-2">
                {errorMessages.general}
              </p>
            )}
            <div className="flex justify-between mt-4">
              <button
                type="button"
                className="cont box w-[48%] rounded text-center border border-2 border-black p-2"
                onClick={handlePrevPage}
              >
                Previous
              </button>
              <button
                type="button"
                className="cont box w-[48%] rounded text-center border border-2 border-black p-2"
                onClick={handleSignUp}
              >
                Sign Up
              </button>
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
          <img src={home} className="w-full" alt="Home" />
          <div className="text-start mx-16">
            <h3 className="font-extrabold text-4xl mt-8 p-2">
              Medmobile Admin
            </h3>
            <p className="font-medium text-2xl">
              Manage healthcare access efficiently!
            </p>
          </div>
        </div>
        <div>
          <div className="h-auto w-full m-auto my-auto p-4 py-2 rounded">
            <h2 className="text-center mt-3 mb-8 text-4xl font-bold">
              Admin Sign Up
            </h2>
            <div className="px-5 mb-5">
              <ProgressBar percent={progress}>
                {[1, 2].map((step, index) => (
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
            <div className="p-6">{renderPage()}</div>
            <div>
              <h2 className="text-center mt-4">
                Already have an account?{" "}
                <Link
                  to="/admin/login"
                  className="text-blue-800 underline font-bold"
                >
                  Log in
                </Link>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSignUp;
