import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../assets/context/userAuthContext";
import OtpInput from "react18-input-otp";
import home from "../../assets/images/home.png";

const Login = () => {
  const { signInWithPhone, verifyCode } = useUserAuth();
  const navigate = useNavigate();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("phone"); // "phone" or "otp"
  const [errors, setErrors] = useState({});

  // Handle sending OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      const cleanedNumber = phoneNumber.replace(/^0+|[^\d]/g, "").slice(-10);
      const fullNumber = `+234${cleanedNumber}`;
      if (fullNumber.length !== 14 || !/^\+234\d{10}$/.test(fullNumber)) {
        setErrors({
          signupError:
            "Please enter a valid 10-digit phone number (e.g., 8135390524)",
        });
        return;
      }
      await signInWithPhone(phoneNumber);
      setStep("otp");
    } catch (err) {
      setErrors({ signupError: "Error sending OTP Number Invalid"});
    }
  };

  // Handle verifying OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      await verifyCode(otp);
      navigate("/");
    } catch (err) {
      setErrors({ signupError: "Invalid OTP: " + err.message });
    }
  };

  // Handle resending OTP
  const handleResendOtp = async () => {
    setErrors({});
    try {
      await signInWithPhone(phoneNumber);
      alert("OTP resent!");
    } catch (err) {
      setErrors({ signupError: "Error resending OTP: " + err.message });
    }
  };

  return (
    <div className="p-4 homee">
      <h2 className="text-center font-bold text-4xl">Medmobile</h2>
      <form
        className="flex items-center justify-center h-120 w-full px-5 sm:px-0 mt-8"
        onSubmit={step === "phone" ? handleSendOtp : handleVerifyOtp}
      >
        <div className="md:grid md:grid-cols-2 gap-2">
          <div className="text-center hidden md:block">
            <img src={home} className="w-full" />
            <div className="text-start mx-10">
              <h3 className="font-bold text-4xl mt-6 p-2">
                <span>Access Your Healthcare</span> <br /> Anytime, Anywhere
              </h3>
              <p className="text-xl">
                Enter your details to manage appointments, view prescriptions
                and stay on top of your health.
              </p>
            </div>
          </div>
          <div className="w-full p-12 rounded-xl">
            <div className="w-full m-auto my-auto p-4 py-6 mt-10 rounded-xl">
              <p className="text-3xl font-bold text-center mt-10">
                {step === "phone" ? "Login" : "OTP Verification"}
              </p>
              {step === "phone" ? (
                <div>
                  <div className="mt-2">
                    <label htmlFor="phone-select" className="font-bold block">
                      Phone Number
                    </label>
                    <div className="flex justify-between items-center">
                      <select
                        name="phone"
                        id="phone-select"
                        className="box rounded-lg w-[26%] font-bold p-3 text-md"
                        disabled
                      >
                        <option value="+234">+234</option>
                      </select>
                      <input
                        id="phone"
                        type="number"
                        placeholder="8135390524"
                        required
                        value={phoneNumber}
                        className="box rounded-lg w-[73%] p-3 bg-none"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </div>
                    {errors.signupError && (
                      <p className="text-red-500 text-sm">
                        {errors.signupError}
                      </p>
                    )}
                  </div>
                  <div className="mt-8">
                    <button className="cont border border-gray-900 font-bold py-3 px-4 w-full mb-10 rounded-xl">
                      Continue
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-center mt-10">
                    Enter the 6-digit code sent to your phone
                  </p>
                  <div className="mt-6 flex justify-center">
                    <OtpInput
                      value={otp}
                      onChange={setOtp}
                      numInputs={6}
                      shouldAutoFocus
                      isInputNum
                      inputStyle={{
                        backgroundColor: "#d9d9d9",
                        width: "3rem",
                        height: "3rem",
                        margin: "0 0.5rem",
                        fontSize: "2rem",
                        border: "2px solid #ccc",
                        borderRadius: "8px",
                        textAlign: "center",
                      }}
                    />
                  </div>
                  {errors.signupError && (
                    <p className="text-red-500 text-sm text-center mt-2">
                      {errors.signupError}
                    </p>
                  )}
                  <div className="text-center mt-4 border-none">
                    <p>
                      Didn't get a code?{" "}
                      <button
                        type="button"
                        className="underline"
                        onClick={handleResendOtp}
                      >
                        Resend
                      </button>
                    </p>
                  </div>
                  <div className="mt-8">
                    <button className="cont border border-gray-900 font-bold py-3 px-4 w-full mb-10 rounded-xl">
                      Verify
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 flex items-center w-full text-center">
              <Link
                to="/signup"
                className="text-lg capitalize text-center w-full"
              >
                Don't have any account yet?{" "}
                <span className="text-blue-700 underline font-bold">
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
