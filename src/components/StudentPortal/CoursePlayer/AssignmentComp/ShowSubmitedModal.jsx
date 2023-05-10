/** @format */

import React from "react";
import { GoX } from "react-icons/go";
import { showDateDetails } from "../../../../utils/date";
const ShowSubmitedModal = ({ assignment, setStatus }) => {
  const { title, repo_link, totalMark, status, createdAt, mark } = assignment || {};
  // console.log(assignment);
  return (
    <>
      <div className="fromWraper">
        {/* header */}
        <div className="fromHeader">
          <div className="formTitle">
            <h3>Submited Assignment Details</h3>
          </div>

          <button onClick={() => setStatus(false)}>
            <GoX />
          </button>
        </div>
        {/* body */}
        <div className="fromBody">
          <div className="input_box">
            <h6> Assingment title </h6>
            <h5>{title}</h5>
          </div>
          <div className="input_box">
            <h6> Repo link </h6>
            <h5>{repo_link}</h5>
          </div>

          <div className="input_box flex justify-between">
            <div className="item">
              <h6>Total mark</h6>
              <h5>{totalMark}</h5>
            </div>
            <div className="item">
              <h6>Received mark</h6>
              <h5>{status === "pending" ? "pending" : mark}</h5>
            </div>
            <div className="item">
              <h6>Submitted time</h6>
              <h5>{showDateDetails(createdAt)}</h5>
            </div>
          </div>

          <div className="action_box">
            <button onClick={() => setStatus(false)} className="submitBtn">
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowSubmitedModal;
