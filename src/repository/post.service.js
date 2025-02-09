import { addDoc, collection, getDoc, doc } from "@firebase/firestore";
import { db } from "../assets/firebaseConfig";

const COLLECTION_NAME = "patientsData";

export const createPatientData = (data) => {
  return addDoc(collection(db, COLLECTION_NAME), data).catch((error) => {
    console.error("Error adding document: ", error);
    throw error; // Propagate the error to be handled in the component
  });
};

export const getPatientData = (id) => {
  const patientsDataRef = doc(collection(db, COLLECTION_NAME), id);
  return getDoc(patientsDataRef);
};
