/** @format */

import React, { useEffect, useState } from "react";
import { GoX } from "react-icons/go";
import { useAddAssignmentMarkMutation } from "../../../../features/api/assignmentMark/assignmentMarkApi";
import swal from "sweetalert";

const AssSubmitModal = ({ student_id, student_name, assignment, setStatus, assMarkRefetch, assRefetch }) => {
  const [addAssignmentMark, { isLoading, isError, isSuccess }] = useAddAssignmentMarkMutation();

  // input state
  const [repoLink, setRepoLink] = useState("");

  const HandleAssignmentSubmit = e => {
    e.preventDefault();
    if (!repoLink) {
      swal("Input Git Repo Link", "error");
    } else {
      let createdAt = new Date();
      let data = {
        student_id,
        student_name,
        assignment_id: assignment.id,
        title: assignment.title,
        repo_link: repoLink,
        totalMark: assignment.totalMark,
        status: "pending",
        mark: 0,
        createdAt,
      };

      addAssignmentMark(data);
    }
  };
  useEffect(() => {
    if (isError) {
      swal("Thare was an error", "error");
    }
  }, [isError]);

  // if success modal off
  useEffect(() => {
    if (isSuccess) {
      assMarkRefetch();
      assRefetch();
      setStatus(false);
    }
  }, [isSuccess]);

  return (
    <>
      <div className="fromWraper">
        <div className="fromHeader">
          <div className="formTitle">
            <h3>Assignment Submit</h3>
          </div>

          <button onClick={() => setStatus(false)}>
            <GoX />
          </button>
        </div>
        <div className="fromBody">
          <form onSubmit={HandleAssignmentSubmit} method="POST">
            <div className="input_box">
              <label htmlFor="question_title">Git Repositorie</label>
              <input value={repoLink} onChange={e => setRepoLink(e.target.value)} id="repo_link" name="repo_link" placeholder="Git Repo Link" />
            </div>

            <div className="action_box">
              <button onClick={() => setStatus(false)} className="cancelBtn">
                Cancel
              </button>
              &nbsp;
              <button type="submit" className="submitBtn">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AssSubmitModal;
