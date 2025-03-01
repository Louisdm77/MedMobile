import {
  addDoc,
  collection,
  getDoc,
  doc,
  setDoc,
  updateDoc,
  orderBy,
  onSnapshot,
  QuerySnapshot,
  query,
} from "@firebase/firestore";
import { db } from "../assets/firebaseConfig";

const COLLECTION_NAME = "patientsData";
const MESSAGE_COLLECTION = 'messages'
export const createPatientData = async (data) => {
  try {
    await setDoc(doc(db, COLLECTION_NAME, data.uid), data);
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error; // Propagate the error to be handled in the component
  }
};

export const getPatientData = (id) => {
  const patientsDataRef = doc(collection(db, COLLECTION_NAME), id);
  return getDoc(patientsDataRef);
};

export const updatePatientDetails = async (data) => {
  try {
    await updateDoc(doc(db, COLLECTION_NAME, data.uid), data);
  } catch (error) {
    console.error(error);
  }
};
