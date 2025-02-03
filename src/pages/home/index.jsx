import React, { useEffect } from "react";
import { useUserAuth } from "../../assets/context/userAuthContext";
import { onAuthStateChanged } from "@firebase/auth";
import Layout from "../../components/layout";
import Header from "../../components/header";
import PatientInfo from "../../components/patientInfo";

const Home = () => {
  const { user, logOut } = useUserAuth();

  useEffect(() => {
    console.log(user);
  }, [onAuthStateChanged]);
  return (
    <div className="">
      {/* Home Page <br /><br />
      <button className="border border-2 border-black p-2"
        onClick={() => {
          logOut();
        }} 
      >
        logout
      </button>*/}
      <Layout>
        <div>
          <Header />
          <div className="w-[60%]">
            <PatientInfo />
          </div>
          
        </div>
      </Layout>
    </div>
  );
};
export default Home;
