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
  });

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
