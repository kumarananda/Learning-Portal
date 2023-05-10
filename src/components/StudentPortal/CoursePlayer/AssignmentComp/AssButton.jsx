/** @format */

import React from "react";

export const AssButton = ({ children, action, value }) => {
  const actionFun = e => {
    e.preventDefault();
    if (action) {
      action(value);
    }
  };
  return (
    <>
      <a
        onClick={actionFun}
        href="/"
        className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
      >
        {children}
      </a>
    </>
  );
};
