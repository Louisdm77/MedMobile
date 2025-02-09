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
      console.log(user)
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
    <div className="p-4 homee">
      <h2 className="text-center font-bold text-4xl">Medmobile</h2>
      <form
        className="flex items-center justify-center h-120 w-full px-5 sm:px-0 mt-10 "
        onSubmit={handleSubmit}
      >
        <div className="md:grid md:grid-cols-2 gap-2">
          <div className="text-center hidden md:block">
            <img
              src="https://s3-alpha-sig.figma.com/img/fc06/ca65/d0fc244a6615f4494c3fb4cbba05c3a2?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Ir50xqZ4g-Qrc1K7kQb898g~2K8ME3tIVjksM67HdEdZNz1KqLglzoxsGAFqxVkc~hcRJiDGaXO9fmCwpl3c6L~Y3MpvnU~DE3j-yPGD-CXt0xk~N2PTCj1qS~sNZAQDlhYLcgCjnkeZe7B4fSd8tycEyxnOXtfupnM-iF1LiJGglvwp15hnuDUR-qkxWtpV5tvu4PwOCLUofTy45hqdlZqc6FMx3FrJgjYxMkK96wIaMIBXlti1PNEZCv~abmXS0F3pEgW9pReD7CRTRX8tqR2vydL1m1auG54NqvlbgmGT6NbgMEicJzhlXNX5XGLudfW9w-htO1J2-9vewnE5tw"
              className="w-full"
            />
            <div className="text-start mx-10">
              <h3 className="font-bold text-5xl mt-8 p-2">
                Access Your Healthcare Anytime, Anywhere
              </h3>
              <p className=" text-2xl">
                Enter your details to manage appointments,view prescriptions and
                stay on top of your health.
              </p>
            </div>
          </div>
          <div className="w-full p-12  rounded-xl">
            <div className="shadow-2xl h-full w-full m-auto my-auto p-4 py-6 mt-10 rounded-xl ">
              <p className="text-3xl font-bold text-center mt-20">Login</p>
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
                <div className="mt-2">
                  <label htmlFor="Email" className="font-bold block">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="********"
                    required
                    value={userLogInInfo.password}
                    className="box rounded-lg w-full p-3 bg-none "
                    onChange={(e) => {
                      setUserLogInInfo({
                        ...userLogInInfo,
                        password: e.target.value,
                      });
                    }}
                  />
                  {/* {errors.dob && (
                  <p className="text-red-500 text-sm">{errors.dob}</p>
                )} */}
                </div>
              </div>
              <div className="mt-8">
                <button className="cont border border-gray-900  font-bold py-3 px-4 w-full rounded-xl">
                  Continue
                </button>
              </div>
            </div>

            <div className="mt-4 flex items-center w-full text-center">
              <Link
                to="/signup"
                className="text-lg font-medium capitalize text-center w-full"
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
