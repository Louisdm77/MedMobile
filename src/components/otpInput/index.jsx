import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import OtpInput from "react18-input-otp";
import { useUserAuth } from "../../assets/context/userAuthContext";

const OtpInputt = () => {
  const { otp, setOtp } = useUserAuth();
  const [userOtp, setUserOtp] = useState("");

  // const handleChange = (enteredOtp) => {
  //   setOtp(enteredOtp);
  // };

  // let timeOut;

  // const generateOtp = () => {
  //   const code = Math.floor(Math.random() * 9000) + 1000;
  //   setUserOtp(code); immediately set otp to generated code

  //   clearTimeout(timeOut);  clear any existing timeout before setting a new one
  //   timeOut = setTimeout(() => {
  //     setUserOtp("-");
  //     console.log("otp now-", userOtp);
  //   }, 60000);
  // };

  // useEffect(() => {
  //   generateOtp();
  // }, []);

  return (
    <div>
      {" "}
      <div className="p-4 homee">
        <h2 className="text-center font-bold text-4xl">Medmobile</h2>
        <form
          className="flex items-center justify-center h-120 w-full px-5 sm:px-0 mt-8 "
          //   onSubmit={handleSubmit}
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
                  Enter your details to manage appointments,view prescriptions
                  and stay on top of your health.
                </p>
              </div>
            </div>
            <div className="w-full p-12  rounded-xl">
              <div className="shadow-2xl  w-full m-auto my-auto p-4 py-6 mt-10 rounded-xl ">
                <h2 className="text-3xl font-bold text-center mt-10">
                  OTP VERIFICATION
                </h2>
                <p className=" text-center mt-10">
                  Enter the 4 digit code that was sent to your email
                </p>
                <div className="mt-6 flex justify-center">
                  <div>
                    <OtpInput
                      className=""
                      id="myInput"
                      //   placeholder="abcd"
                      inputStyle={{
                        backgroundColor: "#d9d9d9",
                        width: "5rem", // Customize width
                        height: "5rem", // Customize height
                        margin: "0 0.5rem", // Space between inputs
                        fontSize: "2rem", // Font size
                        border: "2px solid #ccc", // Border style
                        borderRadius: "8px", // Rounded corners
                        textAlign: "center", // Center text
                      }}
                      // value={userOtp}
                      onChange={(e) => {
                        setOtp(e.target.value);
                      }}
                      numInputs={4}
                      isSuccessed={false}
                      errorStyle="error"
                      successStyle="success"
                      //   separator={<span>-</span>}
                      //   separateAfter={1}
                      shouldAutoFocus
                      isInputNum
                      onSubmit={console.log(userOtp)}
                    />
                    ;
                  </div>
                </div>
                <div className="text-center mt-4 border-none">
                  <p>
                    Didn't get a code?{" "}
                    <button
                      type="button"
                      className="underline"
                      onClick={generateOtp}
                    >
                      Resend
                    </button>
                  </p>
                </div>
                <div className="mt-8">
                  <button className="cont border border-gray-900  font-bold py-3 px-4 w-full mb-10 rounded-xl">
                    Verify
                  </button>
                </div>
              </div>

              <div className="mt-4 flex items-center w-full text-center">
                <Link
                  to="/login"
                  className="text-lg font-medium capitalize text-center w-full"
                >
                  Don&apos;t have any account yet?
                  <span className="text-blue-700 underline"> Log in</span>
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OtpInputt;
