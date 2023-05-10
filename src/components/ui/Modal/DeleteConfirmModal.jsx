/** @format */

import React from "react";
import { GoX } from "react-icons/go";

const DeleteConfirmModal = ({ deleteID, deleteAction, setStatus }) => {
  return (
    <div className="fromWraper">
      <div className="fromHeader">
        <div className="formTitle">
          <h2>Want to delete?</h2>
        </div>
      </div>
      <div className="fromBody">
        <div className="action_box">
          <button onClick={() => setStatus(false)} className="submitBtn ">
            Back
          </button>
          &nbsp;
          <button onClick={() => deleteAction(deleteID)} className="cancelBtn">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
