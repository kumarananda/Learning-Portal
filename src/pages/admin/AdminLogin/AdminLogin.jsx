/** @format */

import React from "react";
import learningportalImg from "../../../assets/image/aks-learning-portal_C.png";
import AdminLoginForm from "../../../components/AdminPortal/AdminLoginForm/AdminLoginForm";

const AdminLogin = () => {
  return (
    <>
      <section className="py-6 bg-primary h-screen grid place-items-center">
        <div className="mx-auto max-w-md px-5 lg:px-0">
          <div>
            <img className="h-14 mx-auto" src={learningportalImg} alt="Learning PortalImg" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">Sign in to Admin Account</h2>
          </div>
          <AdminLoginForm />
        </div>
      </section>
    </>
  );
};

export default AdminLogin;
