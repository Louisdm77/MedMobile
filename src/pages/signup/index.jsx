import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../assets/context/userAuthContext";
const SignUp = () => {
  const { signUp, googleSignIn } = useUserAuth();

  const navigate = useNavigate();
  const initialValue = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("the user info is", userInfo);

      if (userInfo.password === userInfo.confirmPassword) {
        signUp(userInfo.email, userInfo.password);
        navigate("/");
      } else {
        navigate("/error");
      }
    } catch (err) {
      console.log("err: ", err);
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
  const [userInfo, setUserInfo] = useState(initialValue);

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="h-[100vh] items-center flex justify-center px-5 lg:px-0"
      >
        <div className="max-w-screen-xl bg-white border shadow sm:rounded-lg flex justify-center flex-1">
          <div className="flex-1 bg-blue-900 text-center hidden md:flex">
            <div
              className="m-12 xl:m-16 w-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(https://img.freepik.com/free-photo/latin-female-practitioner-using-digital-tablet-isolated-colored-background_662251-430.jpg?t=st=1738494714~exp=1738498314~hmac=d286537d85322ce0b2bfce56408316038f7caa67a8a302088df3d6bf7181d73b&w=740)`,
              }}
            ></div>
          </div>
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className=" flex flex-col items-center">
              <div className="text-center">
                <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-900">
                  Patient's Sign up
                </h1>
                <p className="text-[12px] text-gray-500">
                  Hello enter your details to create your account
                </p>
              </div>
              <div className="w-full flex-1 mt-8">
                <span
                  onClick={handleGoogleSignIn}
                  className=" flex items-center mb-4 justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100 mx-auto max-w-xs flex flex-col gap-4"
                >
                  <div className="flex px-5 justify-center w-full py-3">
                    <div className="min-w-[30px]">
                      <svg className="h-6 w-6" viewBox="0 0 40 40">
                        <path
                          d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                          fill="#FFC107"
                        />
                        <path
                          d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                          fill="#FF3D00"
                        />
                        <path
                          d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                          fill="#4CAF50"
                        />
                        <path
                          d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                          fill="#1976D2"
                        />
                      </svg>
                    </div>
                    <div className="flex w-full justify-center ">
                      <h1 className="whitespace-nowrap text-gray-600 font-bold">
                        Sign in with Google
                      </h1>
                    </div>
                  </div>
                </span>
                <div className="mx-auto max-w-xs flex flex-col gap-4">
                  <input
                    className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="email"
                    placeholder="Enter your email"
                    value={userInfo.email}
                    onChange={(e) => {
                      setUserInfo((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }));
                    }}
                  />
                  <input
                    className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="password"
                    placeholder="Password"
                    value={userInfo.password}
                    onChange={(e) => {
                      setUserInfo((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }));
                    }}
                  />
                  <input
                    className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="password"
                    placeholder="Confirm Password"
                    value={userInfo.confirmPassword}
                    onChange={(e) => {
                      setUserInfo((prev) => ({
                        ...prev,
                        confirmPassword: e.target.value,
                      }));
                    }}
                  />
                  <button className="mt-5 tracking-wide font-semibold bg-blue-900 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                    <svg
                      className="w-6 h-6 -ml-2"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      strokeLinecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                      <circle cx="8.5" cy="7" r="4" />
                      <path d="M20 8v6M23 11h-6" />
                    </svg>
                    <span className="ml-3">Sign Up</span>
                  </button>
                  <p className="mt-6 text-xs text-gray-600 text-center">
                    Already have an account?{" "}
                    <Link to="/login">
                      <span className="text-blue-900 font-semibold">
                        Sign in
                      </span>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
