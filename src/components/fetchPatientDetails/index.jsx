import { getPatientData } from "../../repository/post.service"; // Adjust the path as necessary
import { useUserAuth } from "../../assets/context/userAuthContext";
const fetchPatientDetails = async (user, setPatientDetail, setIsLoading) => {
  // const { user, setPatientDetail} = useUserAuth();
  if (!user || !user.uid) {
    console.log("User is not authenticated or user ID is missing.");
    return; // Exit early if user is not authenticated
  }

  try {
    const querySnapshot = await getPatientData(user.uid);
    if (querySnapshot.exists()) {
      const patientData = querySnapshot.data();
      setPatientDetail(patientData);
    } else {
      console.log("No patient data found for user:", user.uid);
    }
  } catch (error) {
    console.error("Error fetching patient data:", error);
  } finally {
    // setIsLoading(false); // Ensure loading state is reset
  }
};

export default fetchPatientDetails;
