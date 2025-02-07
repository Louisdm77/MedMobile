import React, { useEffect } from "react";
import { useUserAuth } from "../../assets/context/userAuthContext";
import { onAuthStateChanged } from "@firebase/auth";
import Layout from "../../components/layout";
import Header from "../../components/header";
import PatientInfo from "../../components/patientInfo";
import MyDatePicker from "../../components/myDatePicker";
import Emergency from "../../components/emergency";

const Home = () => {
  const { user, logOut, clicked, setClicked } = useUserAuth();

  useEffect(() => {
    console.log(user);
  }, [onAuthStateChanged]);

  useEffect(() => {
    if (user) {
      setClicked("Home"); // Set clicked to 'Home' when the user is signed in
    }
  }, [user]);
  return (
    <div className="">
      <Layout>
        <div>
          <Header />
          <div className="flex justify-between">
            <div className="w-[60%]">
              <PatientInfo />
            </div>
            <div className="w-[40%] p-2">
              <MyDatePicker />
              <Emergency />
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};
export default Home;
