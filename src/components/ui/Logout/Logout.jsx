/** @format */

import React from "react";
import { useDispatch } from "react-redux";
import { userLoggedOut } from "../../../features/auth/authSlice";

const Logout = ({ children }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(userLoggedOut());
    localStorage.clear();
  };
  return (
    <div onClick={handleLogout}>
      {children ? (
        children
      ) : (
        <button className="flex gap-2 items-center px-4 py-1 rounded-full text-sm transition-all bg-red-600 hover:bg-red-700 font-medium">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
            />
          </svg>
          Logout
        </button>
      )}
    </div>
  );
};

export default Logout;
