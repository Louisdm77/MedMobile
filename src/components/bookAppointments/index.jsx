import React from "react";
import Layout from "../layout";
import { useUserAuth } from "../../assets/context/userAuthContext";

const BookAppointments = () => {
  const { user, patientDetail } = useUserAuth();
  return (
    <Layout>
      <div>
        <div className='p-4'>
          <h2>
            Hi, <span>{patientDetail.fullName} 👋</span>
          </h2>
        </div>
      </div>
    </Layout>
  );
};

export default BookAppointments;
