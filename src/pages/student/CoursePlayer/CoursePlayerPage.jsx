/** @format */

import React from "react";
import CoursePlayer from "../../../components/StudentPortal/CoursePlayer/CoursePlayer.jsx";

const CoursePlayerPage = () => {
  return (
    <>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <CoursePlayer />
        </div>
      </section>
    </>
  );
};

export default CoursePlayerPage;
