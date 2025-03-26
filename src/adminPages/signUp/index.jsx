import React, { useState, useEffect } from "react";
import home from "../../assets/images/home.png";
import { Link } from "react-router-dom";
import { useUserAuth } from "../../assets/context/userAuthContext";
import { useNavigate } from "react-router-dom";

const AdminSignUp = () => {
  const { signUp, user } = useUserAuth();
  const navigate = useNavigate();

  const [adminInformation, setAdminInformation] = useState({
    email: "",
    password: "",
    fullName: "",
    specialty: "",
  });

  const [errorMessages, setErrorMessages] = useState({});

  useEffect(() => {
    console.log(user);
  }, [user]);

  useEffect(() => {
    console.log(adminInformation);
  }, [adminInformation]);

  const handleSignUp = async (event) => {
    event.preventDefault(); // Prevent default form submission
    setErrorMessages({}); // Reset error messages

    const newErrors = {}; // Create a new errors object

    // Validate input fields
    if (!adminInformation.fullName)
      newErrors.fullName = "Full Name is required.";
    if (!adminInformation.email) newErrors.email = "Email Address is required.";
    if (!adminInformation.password)
      newErrors.password = "Password is required.";
    if (!adminInformation.specialty)
      newErrors.specialty = "Doctor Specialty is required.";

    // Check for errors before signing up
    if (Object.keys(newErrors).length > 0) {
      setErrorMessages(newErrors);
      return;
    }

    // Attempt to sign up
    try {
      await signUp(adminInformation.email, adminInformation.password);
      navigate("/admin/home");
    } catch (err) {
      console.log("error:", err);
      handleFirebaseError(err);
    }
  };

  const handleFirebaseError = (err) => {
    const newErrors = {};
    switch (err.code) {
      case "auth/email-already-in-use":
        newErrors.email = "This email address is already in use.";
        break;
      case "auth/weak-password":
        newErrors.password = "Password should be at least 6 characters.";
        break;
      case "auth/invalid-email":
        newErrors.email = "Please enter a valid email address.";
        break;
      default:
        newErrors.email = "Error signing up. Please try again later.";
    }
    setErrorMessages(newErrors);
  };

  return (
    <div>
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
                Sign Up
              </h2>
              <div className="px-10 mb-5">
                <div className="grid mt-2">
                  <label htmlFor="username" className="font-bold">
                    Full Name
                  </label>
                  <input
                    id="username"
                    type="text"
                    placeholder="admin_fullname"
                    className="box rounded-lg w-full p-3"
                    required
                    onChange={(e) => {
                      setAdminInformation((prev) => ({
                        ...prev,
                        fullName: e.target.value,
                      }));
                    }}
                  />
                  {errorMessages.fullName && (
                    <div className="text-red-500 mt-1">
                      {errorMessages.fullName}
                    </div>
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
                    required
                    onChange={(e) => {
                      setAdminInformation((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }));
                    }}
                  />
                  {errorMessages.email && (
                    <div className="text-red-500 mt-1">
                      {errorMessages.email}
                    </div>
                  )}
                </div>
                <div className="grid mt-2">
                  <label htmlFor="password" className="font-bold">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="********"
                    className="box rounded-lg w-full p-3"
                    required
                    onChange={(e) => {
                      setAdminInformation((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }));
                    }}
                  />
                  {errorMessages.password && (
                    <div className="text-red-500 mt-1">
                      {errorMessages.password}
                    </div>
                  )}
                </div>
                <div className="grid mt-2">
                  <label htmlFor="role" className="font-bold">
                    Doctor Specialty
                  </label>
                  <select
                    name="role"
                    id="role"
                    className="box rounded-lg w-full p-3"
                    required
                    onChange={(e) => {
                      setAdminInformation((prev) => ({
                        ...prev,
                        specialty: e.target.value,
                      }));
                    }}
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
                    <div className="text-red-500 mt-1">
                      {errorMessages.specialty}
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  className="cont box w-full rounded text-center border border-2 border-black mt-4 p-2"
                  onClick={handleSignUp}
                >
                  Sign Up
                </button>
              </div>
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
    </div>
  );
};

export default AdminSignUp;
