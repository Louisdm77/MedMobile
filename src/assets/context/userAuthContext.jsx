import React, { createContext, useState, useEffect, useContext } from "react";
import { auth } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "@firebase/auth";

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.log(err);
    throw err; // Rethrow the error so it can be handled by the caller
  }
};

const signUp = async (email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.log(err);
    throw err; // Rethrow the error so it can be handled by the caller
  }
};

// const googleSignIn = async () => {
//   try {
//     const googleAuthProvider = new GoogleAuthProvider();
//     await signInWithPopup(auth, googleAuthProvider);
//   } catch (err) {
//     console.log(err);
//     throw err; // Rethrow the error so it can be handled by the caller
//   }
// };

const logOut = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    console.log(err);
    throw err; // Rethrow the error so it can be handled by the caller
  }
};

const userAuthContext = createContext({});

export const UserAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [clicked, setClicked] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [viewChat, setViewChat] = useState(false);
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

  const [clickedUser, setClickedUser] = useState({
    userId: "",
    name: "",
    profession: "Patient",
    conversation: "",
    email: "",
  });
  const [messages, setMessages] = useState([]);
  const [lastMsg, setLastMsg] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set user to the current user object
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    user,
    loading,
    signUp,
    logOut,
    // googleSignIn,
    login,
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
  };

  return (
    <userAuthContext.Provider value={value}>
      {children}
    </userAuthContext.Provider>
  );
};

export const useUserAuth = () => {
  return useContext(userAuthContext);
};
