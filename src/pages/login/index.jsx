import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUserAuth } from "../../assets/context/userAuthContext";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "@firebase/auth";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

const Login = () => {
  const { user, login, googleSignIn } = useUserAuth();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const initialValue = {
    email: "",
    password: "",
  };

  const [viewPassword, setViewPassword] = useState(false);

  const [userLogInInfo, setUserLogInInfo] = useState(initialValue);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("The user info is:", userLogInInfo);

      // Attempt to log in the user
      await login(userLogInInfo.email, userLogInInfo.password);

      // If login is successful, navigate to the home page
      navigate("/");
    } catch (err) {
      console.log("Error:", err);

      // Check for specific error codes and set error messages accordingly
      if (err.code === "auth/invalid-credential") {
        setErrors({ ...errors, signupError: "Invalid Username or Password" });
      } else if (err.code === "auth/user-not-found") {
        setErrors({ ...errors, signupError: "User not found" });
      } else if (err.code === "auth/wrong-password") {
        setErrors({ ...errors, signupError: "Incorrect password" });
      } else {
        setErrors({ ...errors, generalError: "Something went wrong" });
      }
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
    <div className="p-4 homee">
      <h2 className="text-center font-bold text-4xl">Medmobile</h2>
      <form
        className="flex items-center justify-center h-120 w-full px-5 sm:px-0 mt-8 "
        onSubmit={handleSubmit}
      >
        <div className="md:grid md:grid-cols-2 gap-2">
          <div className="text-center hidden md:block">
            <img
              src="https://s3-alpha-sig.figma.com/img/fc06/ca65/d0fc244a6615f4494c3fb4cbba05c3a2?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Ir50xqZ4g-Qrc1K7kQb898g~2K8ME3tIVjksM67HdEdZNz1KqLglzoxsGAFqxVkc~hcRJiDGaXO9fmCwpl3c6L~Y3MpvnU~DE3j-yPGD-CXt0xk~N2PTCj1qS~sNZAQDlhYLcgCjnkeZe7B4fSd8tycEyxnOXtfupnM-iF1LiJGglvwp15hnuDUR-qkxWtpV5tvu4PwOCLUofTy45hqdlZqc6FMx3FrJgjYxMkK96wIaMIBXlti1PNEZCv~abmXS0F3pEgW9pReD7CRTRX8tqR2vydL1m1auG54NqvlbgmGT6NbgMEicJzhlXNX5XGLudfW9w-htO1J2-9vewnE5tw"
              className="w-full"
            />
            <div className="text-start mx-10">
              <h3 className="font-bold text-4xl mt-6 p-2">
                <span>Access Your Healthcare</span> <br /> Anytime, Anywhere
              </h3>
              <p className=" text-xl">
                Enter your details to manage appointments,view prescriptions and
                stay on top of your health.
              </p>
            </div>
          </div>
          <div className="w-full p-12  rounded-xl">
            <div className="shadow-2xl  w-full m-auto my-auto p-4 py-6 mt-10 rounded-xl ">
              <p className="text-3xl font-bold text-center mt-10">Login</p>
              <div>
                <div className="mt-2">
                  <label htmlFor="Email" className="font-bold block">
                    Hospital Num/Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    placeholder="RH/20/1356 or jane2@gmail.com"
                    value={userLogInInfo.email}
                    className="box w-full p-3 rounded-lg bg-none"
                    onChange={(e) =>
                      setUserLogInInfo({
                        ...userLogInInfo,
                        email: e.target.value,
                      })
                    }
                  />
                  {/* {errors.dob && (
                  <p className="text-red-500 text-sm">{errors.dob}</p>
                )} */}
                </div>
                <div className="mt-2 ">
                  <label htmlFor="Email" className="font-bold block">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={viewPassword ? "text" : "password"}
                      placeholder="********"
                      required
                      value={userLogInInfo.password}
                      className="box rounded-lg w-full p-3 bg-none relative"
                      onChange={(e) => {
                        setUserLogInInfo({
                          ...userLogInInfo,
                          password: e.target.value,
                        });
                      }}
                    />
                    <div className="text-2xl absolute right-2 bottom-4 flex">
                      <button
                        type="button"
                        onClick={() => {
                          setViewPassword(!viewPassword);
                        }}
                        className={`${!viewPassword ? "block" : "hidden"}`}
                      >
                        <FaRegEye />
                      </button>
                      <button
                        type="button"
                        className={`${viewPassword ? "block" : "hidden"}`}
                        onClick={() => {
                          setViewPassword(!viewPassword);
                        }}
                      >
                        {" "}
                        <FaRegEyeSlash />
                      </button>
                    </div>
                  </div>

                  {errors.signupError && (
                    <p className="text-red-500 text-sm">{errors.signupError}</p>
                  )}
                </div>
              </div>
              <div className="mt-8">
                <button className="cont border border-gray-900  font-bold py-3 px-4 w-full mb-10 rounded-xl">
                  Continue
                </button>
              </div>
            </div>

            <div className="mt-4 flex items-center w-full text-center">
              <Link
                to="/signup"
                className="text-lg  capitalize text-center w-full"
              >
                Don&apos;t have any account yet?
                <span className="text-blue-700 underline font-bold">
                  {" "}
                  Sign Up
                </span>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Login;
