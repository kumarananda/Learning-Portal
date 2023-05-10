/** @format */

import React from "react";
import { Link, useLocation } from "react-router-dom";
import learningportalImg from "../../assets/image/aks-learning-portal.png";

const AuthHeader = () => {
  const location = useLocation();
  const { pathname } = location || {};

  console.log(pathname);

  return (
    <>
      <nav className="shadow-md">
        <div className="max-w-7xl px-5 lg:px-0 mx-auto flex justify-between py-3">
          <div>
            <Link to={"/"}>
              <img className="h-8" src={learningportalImg} alt="Learning Portal" />
            </Link>
          </div>
          <div className="flex items-center gap-3">
            {pathname === "/" && (
              <Link to={"/admin"} className="font-medium">
                Go as admin
              </Link>
            )}
            {pathname === "/admin" && (
              <Link to={"/"} className="font-medium">
                Student Portal
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default AuthHeader;
