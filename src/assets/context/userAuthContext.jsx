import React, { createContext, useState, useEffect, useContext } from "react";
import { auth } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "@firebase/auth";

// These are your original functions, unchanged
const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// const googleSignIn = async () => {
//   try {
//     const googleAuthProvider = new GoogleAuthProvider();
//     await signInWithPopup(auth, googleAuthProvider);
//   } catch (err) {
//     console.log(err);
//     throw err;
//   }
// };

const logOut = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const userAuthContext = createContext({});

export const UserAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [confirmationResult, setConfirmationResult] = useState(null); // Added for phone sign-in
  const [loading, setLoading] = useState(true);
  const [clicked, setClicked] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [viewChat, setViewChat] = useState(false);
  const [adminData, setAdminData] = useState([]);
  const [appExperience, setAppExperience] = useState({
    starRating: 0,
    difficult: "",
    improvement: "",
  });
  const [staffExperience, setStaffExperience] = useState({
    staff: "",
    lastVisit: "",
    staffExperience: [],
    suggestion: [],
    rating: 0,
    details: "",
  });
  const [patientDetail, setPatientDetail] = useState({
    uid: "",
    fullName: "",
    phoneNumber: "",
    email: "",
    dob: "",
    hospital: "",
    hospitalNum: "",
    emergencyContact: "",
    emergencyContactNum: "",
    insuranceProvider: "",
    bloodGroup: "",
    genotype: "",
    weight: "",
    height: "",
    allergies: [],
    medicalConditions: [],
    address: "",
    feedback: [],
    appointments: [],
  });
  const [otp, setOtp] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [view, setView] = useState(true);
  const [data, setData] = useState({
    uid: "",
    fullName: "",
    phoneNumber: "",
    email: "",
    dob: "",
    hospital: "",
    hospitalNum: "",
    emergencyContact: "",
    emergencyContactNum: "",
    insuranceProvider: "",
    bloodGroup: "",
    genotype: "",
    weight: "",
    height: "",
    allergies: [],
    medicalConditions: [],
    address: "",
    feedback: [],
    appointments: [],
  });

  const [adminInfo, setAdminInfo] = useState({
    fullName: "",
    uid: "",
    email: "",
    specialty: "",
    docRegNum: "",
    createdAt: "",
  });
  const [clickedUser, setClickedUser] = useState({
    userId: "",
    name: "",
    profession: "Patient",
    conversation: "",
    email: "",
  });
  const [messages, setMessages] = useState([]);
  const [lastMsg, setLastMsg] = useState([]);

  // Moved your reCAPTCHA useEffect inside the component
  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          console.log("reCAPTCHA solved:", response);
        },
      }
    );

    return () => {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
      }
    };
  }, []);

  //original auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Phone sign-in functions moved inside to access state
  const signInWithPhone = async (phoneNumber) => {
    try {
      const appVerifier = window.recaptchaVerifier;
      // Remove leading zeros and all non-digit characters, take last 10 digits
      const cleanedNumber = phoneNumber.replace(/^0+|[^\d]/g, "").slice(-10);
      const fullNumber = `+234${cleanedNumber}`;

      // Log before validation
      console.log("Constructed phone number:", fullNumber);

      // Validate: +234 (4 chars including +) + 10 digits = 14 chars
      if (fullNumber.length !== 14 || !/^\+234\d{10}$/.test(fullNumber)) {
        throw new Error(
          "Invalid phone number. Must be 10 digits after +234 (e.g., +2348135390524)."
        );
      }

      // Log right before sending to Firebase
      console.log("Sending to Firebase:", fullNumber);

      const result = await signInWithPhoneNumber(auth, fullNumber, appVerifier);
      setConfirmationResult(result);
      return result;
    } catch (error) {
      console.error("Error during sign-in:", error);
      throw error;
    }
  };
  const verifyCode = async (code) => {
    try {
      if (!confirmationResult)
        throw new Error("No confirmation result available");
      const result = await confirmationResult.confirm(code);
      setUser(result.user); // Now works because it's in scope
      setConfirmationResult(null);
      return result.user;
    } catch (error) {
      console.error("Error verifying code:", error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    signUp,
    logOut,
    // googleSignIn,
    login,
    signInWithPhone,
    verifyCode,
    clicked,
    setClicked,
    data,
    setData,
    isLoading,
    setIsLoading,
    patientDetail,
    setPatientDetail,
    otp,
    setOtp,
    otpCode,
    setOtpCode,
    clickedUser,
    setClickedUser,
    messages,
    setMessages,
    lastMsg,
    setLastMsg,
    appExperience,
    setAppExperience,
    staffExperience,
    setStaffExperience,
    viewChat,
    setViewChat,
    adminInfo,
    setAdminInfo,
    adminData,
    setAdminData,
    view,
    setView,
  };

  return (
    <userAuthContext.Provider value={value}>
      {children}
      <div id="recaptcha-container"></div> {/* Added for reCAPTCHA */}
    </userAuthContext.Provider>
  );
};

export const useUserAuth = () => {
  return useContext(userAuthContext);
};
