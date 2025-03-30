import React, { useState } from "react";
import home from "../../assets/images/home.png";
import { Link } from "react-router-dom";
import { useUserAuth } from "../../assets/context/userAuthContext";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [userCredential, setUserCredential] = useState({
    email: "",
    password: "",
  });
  const [errorMessages, setErrorMessages] = useState({});
  const { login, adminInfo, setAdminInfo, user } = useUserAuth();
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setErrorMessages({}); // Reset error messages

    const newErrors = {}; // Create a new errors object

    // Validate input fields
    if (!userCredential.email) newErrors.email = "Email is required.";
    if (!userCredential.password) newErrors.password = "Password is required.";

    // Check if there are any errors
    if (Object.keys(newErrors).length > 0) {
      setErrorMessages(newErrors);
      return;
    }

    // Attempt to login
    try {
      await login(userCredential.email, userCredential.password);
      setAdminInfo({
        fullName: "",
        uid: user.uid,
        email: user.email,
        specialty: "",
        docRegNum: "",
        createdAt: "",
      });
      console.log(user)
      navigate("/admin/home");
    } catch (err) {
      console.error("Login error:", err);
      handleFirebaseError(err);
    }
  };

  const handleFirebaseError = (err) => {
    const newErrors = {}; // Create a new errors object for Firebase errors
    switch (err.code) {
      case "auth/invalid-email":
        newErrors.email = "Please enter a valid email address.";
        break;
      case "auth/invalid-credential":
        newErrors.password = "Incorrect email or password. Please try again.";
        break;
      case "auth/too-many-requests":
        newErrors.email = "Too many login attempts. Please try again later.";
        break;
      default:
        newErrors.email = "Error logging in. Please try again later.";
    }
    setErrorMessages(newErrors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserCredential((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <div className="p-4 homee">
        <h2 className="text-center font-bold text-4xl">Medmobile</h2>
        <form
          className="flex items-center justify-center h-120 w-full px-5 sm:px-0 mt-8"
          onSubmit={handleLogin}
        >
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
            <div className="h-auto w-full m-auto my-auto p-4 py-2 rounded">
              <h2 className="text-center mt-3 mb-8 text-4xl font-bold">
                Admin's Login
              </h2>
              <div className="px-10 mb-5">
                <div className="mt-2">
                  <label htmlFor="email" className="font-bold block">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="admin@example.com"
                    className="box rounded-lg w-full p-3"
                    value={userCredential.email}
                    onChange={handleChange}
                    required
                  />
                  {errorMessages.email && (
                    <div className="text-red-500 mt-1">
                      {errorMessages.email}
                    </div>
                  )}
                </div>
                <div className="mt-2">
                  <label htmlFor="password" className="font-bold block">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="********"
                    className="box rounded-lg w-full p-3"
                    value={userCredential.password}
                    onChange={handleChange}
                    required
                  />
                  {errorMessages.password && (
                    <div className="text-red-500 mt-1">
                      {errorMessages.password}
                    </div>
                  )}
                </div>
                <div className="mt-8">
                  <button
                    type="submit"
                    className="cont border border-gray-900 font-bold py-3 px-4 w-full mb-10 rounded-xl"
                  >
                    Log in
                  </button>
                </div>
                <div className="text-center">
                  <Link to="/admin/signup" className="text-blue-800 underline">
                    Don't have an account? Sign up here.
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
