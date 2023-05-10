/** @format */

import React, { useEffect, useState } from "react";
import { useDeleteAssignmentMutation, useGetAssignmentsQuery } from "../../../features/api/assignments/assignmentsApi.js";
import SingleAssignment from "./SingleAssignment.jsx";
import Modal from "../../ui/Modal/Modal.jsx";
import AssignmentEditForm from "./AssForms/AssignmentEditForm.jsx";
import AssignmentAddForm from "./AssForms/AssignmentAddForm.jsx";
import { useGetVideosQuery } from "../../../features/api/videos/videosApi.js";
import DeleteConfirmModal from "../../ui/Modal/DeleteConfirmModal.jsx";
import Error from "../../ui/InfoMsg/Error.jsx";

const Assignments = () => {
  const { data: assignments, isLoading, isSuccess, isError } = useGetAssignmentsQuery();
  // video query //up components query for avoiding Loading delay
  const videoQuery = useGetVideosQuery();

  //
  const [deleteAssignment, { isLoading: deleteLoading, isError: deleteError, isSuccess: deleteSuccess, error: deleteData }] =
    useDeleteAssignmentMutation();

  // add modal status
  const [addStatus, setAddStatus] = useState(false);

  // edit modal status and data state
  const [editStatus, setEditStatus] = useState(false);
  const [editAss, setEditAss] = useState({});

  // set delete confirm modal
  const [deleteStatus, setDeleteStatus] = useState(false);
  const [deleteID, setDeleteId] = useState("");

  let content = null;
  if (isLoading) {
    content = "Loading...";
  }
  if (!isLoading && isError) {
    content = "There was an error";
  }
  if (!isLoading && !isError && isSuccess) {
    const assLength = assignments.length;
    if (assLength === 0) {
      content = "No assignment found!";
    } else if (assLength >= 0) {
      content = assignments.map(assignment => (
        <SingleAssignment
          assignment={assignment}
          setEdit={setEditAss}
          setStatus={setEditStatus}
          setDeleteId={setDeleteId}
          setDeleteStatus={setDeleteStatus}
          key={assignment.id}
        />
      ));
    }
  }

  // handle Quiz delete
  const handleAssignmentDelete = delId => {
    deleteAssignment(delId);
  };

  // if delete successful modal will cloase
  useEffect(() => {
    if (deleteSuccess) {
      setDeleteStatus(false);
    }
  }, [deleteSuccess]);

  return (
    <>
      <div className="px-3 py-20 bg-opacity-10">
        <div className="w-full flex">
          <button disabled={videoQuery?.isLoading} onClick={() => setAddStatus(true)} className="btn ml-auto">
            {videoQuery?.isLoading ? "Loading...." : "Add Assignment"}
          </button>
        </div>
        <div className="overflow-x-auto mt-4">
          <table className="divide-y-1 text-base divide-gray-600 w-full">
            <thead>
              <tr>
                <th className="table-th">Title</th>
                <th className="table-th">Video Title</th>
                <th className="table-th">Mark</th>
                <th className="table-th">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-600/50">{content}</tbody>
          </table>
        </div>
        {/* will be update another type of alert */}
        <div className="formInfoMsg">
          {deleteError && <Error message={deleteData?.error ? "Server Error!" : deleteData?.data} />}
          {deleteLoading && <h5>Requesting...</h5>}
        </div>
      </div>

      {/* add form modal */}
      <Modal modalOpen={addStatus} setModalOpen={setAddStatus} MBoxWidth={900} outCickHide={false}>
        <AssignmentAddForm setStatus={setAddStatus} assignments={assignments} />
      </Modal>

      {/* edit form modal */}
      <Modal modalOpen={editStatus} setModalOpen={setEditStatus} MBoxWidth={850} outCickHide={false}>
        <AssignmentEditForm videoQuery={videoQuery} editAss={editAss} setStatus={setEditStatus} assignments={assignments} />
      </Modal>

      {/* delete modal */}
      <Modal modalOpen={deleteStatus} setModalOpen={setDeleteStatus} MBoxWidth={400} outCickHide={false}>
        <DeleteConfirmModal deleteID={deleteID} deleteAction={handleAssignmentDelete} setStatus={setDeleteStatus} />
      </Modal>
    </>
  );
};

export default Assignments;

