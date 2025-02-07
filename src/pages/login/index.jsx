import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUserAuth } from "../../assets/context/userAuthContext";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "@firebase/auth";

const Login = () => {
  const { user, login, googleSignIn } = useUserAuth();
  const navigate = useNavigate();
  const initialValue = {
    email: "",
    password: "",
  };

  const [userLogInInfo, setUserLogInInfo] = useState(initialValue);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("the user info is :", userLogInInfo);
      await login(userLogInInfo.email, userLogInInfo.password);
      // console.log("user", user);
      navigate("/");
    } catch (err) {
      console.log("err: ", err);
      alert(err);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/");
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    console.log(userLogInInfo);
    console.log(user);
  }, [userLogInInfo, onAuthStateChanged]);
  return (
    <div className="p-4">
      <h2 className="text-center font-bold text-4xl">Medmobile</h2>
      <form
        className="flex items-center justify-center h-auto w-full px-5 sm:px-0 mt-4 "
        onSubmit={handleSubmit}
      >
        <div className="flex bg-white rounded-lg shadow-lg  overflow-hidden max-w-sm lg:max-w-full lg:p-7 lg:h-[70%] w-full">
          <div
            className="hidden md:block lg:w-1/2 bg-contain bg-no-repeat "
            style={{
              backgroundImage: `url(https://img.freepik.com/premium-photo/african-american-pediatrician-checking-little-girl-body-temperature_116547-19897.jpg?w=740)`,
            }}
          ></div>
          <div className="w-full p-8 lg:w-1/2 bg-gray-100 rounded-lg">
            <p className="text-3xl font-bold text-center">Login</p>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                {/* Hospital Number */}
                Email
              </label>
              <input
                className="text-gray-700  rounded-xl py-3 px-4 block w-full outline-none bg-gray-300"
                type="email"
                required
                onChange={(e) => {
                  setUserLogInInfo((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="mt-4 flex flex-col justify-between">
              <div className="flex justify-between">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
              </div>
              <input
                className="text-gray-700  rounded-xl py-3 px-4 block w-full outline-none"
                type="password"
                onChange={(e) => {
                  setUserLogInInfo((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }));
                }}
              />
              <div className="flex items-center justify-between text-lg font-medium mt-4 text-gray-900">
                <div className="flex items-center">
                  <input type="checkbox" name="Remember" id="Remember" /> &nbsp;
                  <label htmlFor="Remember">Remember me</label>
                </div>

                <div>
                  {" "}
                  <a href="#" className="  hover:text-gray-900 ">
                    Forgot Password?
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <button className="border border-gray-900  font-bold py-3 px-4 w-full rounded-xl">
                Continue
              </button>
            </div>

            <div className="mt-4 flex items-center w-full text-center">
              <Link
                to="/signup"
                className="text-xs text-gray-500 capitalize text-center w-full"
              >
                Don&apos;t have any account yet?
                <span className="text-blue-700"> Sign Up</span>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Login;
