/** @format */

import React from "react";
import learningportalImg from "../../../assets/image/aks-learning-portal_C.png";
import StudentRegForm from "../../../components/StudentPortal/StudentRegForm/StudentRegForm";

const StudentRegistration = () => {
  return (
    <>
      <section className="py-6 bg-primary h-screen grid place-items-center">
        <div className="mx-auto max-w-md px-5 lg:px-0">
          <div>
            <img className="h-14 mx-auto" src={learningportalImg} alt="Learning Portal" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">Create Your New Account</h2>
          </div>
          <StudentRegForm />
        </div>
      </section>
    </>
  );
};

export default StudentRegistration;
