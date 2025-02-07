import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import { FaDotCircle } from "react-icons/fa";
import { GiCheckMark } from "react-icons/gi";
import { useUserAuth } from "../../assets/context/userAuthContext";

const SignUp = () => {
  const { signUp } = useUserAuth();
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
  const [data, setData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    dob: "",
    hospital: "",
    hospitalNum: "",
    emergencyContact: "",
    emergencyContactNum: "",
    insuranceProvider: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateFields()) {
      try {
        const response = await signUp(userInfo.email, userInfo.password);
        console.log("Signup successful:", response);
        navigate("/"); // Redirect after successful signup
      } catch (err) {
        console.log("Signup error:", err);
        navigate("/error"); // Redirect to an error page on failure
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
                placeholder="......."
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
          <div className="shadow-2xl h-auto w-full m-auto my-auto p-4 py-6 mt-10 rounded">
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

// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useUserAuth } from "../../assets/context/userAuthContext";
// const SignUp = () => {
//   const { signUp, googleSignIn } = useUserAuth();

//   const navigate = useNavigate();
//   const initialValue = {
//     email: "",
//     password: "",
//     confirmPassword: "",
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       console.log("the user info is", userInfo);

//       if (userInfo.password === userInfo.confirmPassword) {
//         signUp(userInfo.email, userInfo.password);
//         navigate("/");
//       } else {
//         navigate("/error");
//       }
//     } catch (err) {
//       console.log("err: ", err);
//     }
//   };

//   const handleGoogleSignIn = async (e) => {
//     e.preventDefault();
//     try {
//       await googleSignIn();
//       navigate("/");
//     } catch (error) {
//       console.log("error: ", error);
//     }
//   };
//   const [userInfo, setUserInfo] = useState(initialValue);

//   useEffect(() => {
//     console.log(userInfo);
//   }, [userInfo]);

//   return (
//     <div>
//       <div
//         onSubmit={handleSubmit}
//         className="h-[100vh] items-center flex justify-center px-5 lg:px-0"
//       >
//         <div className="max-w-screen-xl bg-white border shadow sm:rounded-lg flex justify-center flex-1">
//           <div className="flex-1 bg-blue-900 text-center hidden md:flex">
//             <div
//               className="m-12 xl:m-16 w-full bg-cover bg-center bg-no-repeat"
//               style={{
//                 backgroundImage: `url(https://img.freepik.com/free-photo/latin-female-practitioner-using-digital-tablet-isolated-colored-background_662251-430.jpg?t=st=1738494714~exp=1738498314~hmac=d286537d85322ce0b2bfce56408316038f7caa67a8a302088df3d6bf7181d73b&w=740)`,
//               }}
//             ></div>
//           </div>
//           <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
//             <div className=" flex flex-col items-center">
//               <div className="text-center">
//                 <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-900">
//                   Patient's Sign up
//                 </h1>
//                 <p className="text-[12px] text-gray-500">
//                   Hello enter your details to create your account
//                 </p>
//               </div>
//               <div className="w-full flex-1 mt-8">
//                 <span
//                   onClick={handleGoogleSignIn}
//                   className=" flex items-center mb-4 justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100 mx-auto max-w-xs flex flex-col gap-4"
//                 >
//                   <div className="flex px-5 justify-center w-full py-3">
//                     <div className="min-w-[30px]">
//                       <svg className="h-6 w-6" viewBox="0 0 40 40">
//                         <path
//                           d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
//                           fill="#FFC107"
//                         />
//                         <path
//                           d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
//                           fill="#FF3D00"
//                         />
//                         <path
//                           d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
//                           fill="#4CAF50"
//                         />
//                         <path
//                           d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
//                           fill="#1976D2"
//                         />
//                       </svg>
//                     </div>
//                     <div className="flex w-full justify-center ">
//                       <h1 className="whitespace-nowrap text-gray-600 font-bold">
//                         Sign in with Google
//                       </h1>
//                     </div>
//                   </div>
//                 </span>
//                 <div className="mx-auto max-w-xs flex flex-col gap-4">
//                   <input
//                     className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
//                     type="email"
//                     placeholder="Enter your email"
//                     value={userInfo.email}
//                     onChange={(e) => {
//                       setUserInfo((prev) => ({
//                         ...prev,
//                         email: e.target.value,
//                       }));
//                     }}
//                   />
//                   <input
//                     className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
//                     type="password"
//                     placeholder="Password"
//                     value={userInfo.password}
//                     onChange={(e) => {
//                       setUserInfo((prev) => ({
//                         ...prev,
//                         password: e.target.value,
//                       }));
//                     }}
//                   />
//                   <input
//                     className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
//                     type="password"
//                     placeholder="Confirm Password"
//                     value={userInfo.confirmPassword}
//                     onChange={(e) => {
//                       setUserInfo((prev) => ({
//                         ...prev,
//                         confirmPassword: e.target.value,
//                       }));
//                     }}
//                   />
//                   <button className="mt-5 tracking-wide font-semibold bg-blue-900 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
//                     <svg
//                       className="w-6 h-6 -ml-2"
//                       fill="none"
//                       stroke="currentColor"
//                       stroke-width="2"
//                       strokeLinecap="round"
//                       stroke-linejoin="round"
//                     >
//                       <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
//                       <circle cx="8.5" cy="7" r="4" />
//                       <path d="M20 8v6M23 11h-6" />
//                     </svg>
//                     <span className="ml-3">Sign Up</span>
//                   </button>
//                   <p className="mt-6 text-xs text-gray-600 text-center">
//                     Already have an account?{" "}
//                     <Link to="/login">
//                       <span className="text-blue-900 font-semibold">
//                         Sign in
//                       </span>
//                     </Link>
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;
