/** @format */

import React from "react";
import Assignments from "../../../components/AdminPortal/Assignments/Assignments";

const AssignmentPage = () => {
  return (
    <>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <Assignments />
        </div>
      </section>
    </>
  );
};

export default AssignmentPage;
