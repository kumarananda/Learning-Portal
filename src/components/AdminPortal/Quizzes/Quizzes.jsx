/** @format */

import React, { useEffect, useState } from "react";
import { useDeleteQuizMutation, useGetQuizzessQuery } from "../../../features/api/quizzes/quizzesApi";
import { useGetVideosQuery } from "../../../features/api/videos/videosApi";
import Modal from "../../ui/Modal/Modal";
import QuizAddForm from "./QuizeForms/QuizAddForm";
import QuizEditForm from "./QuizeForms/QuizEditForm";
import SingleQuiz from "./SingleQuiz";
import DeleteConfirmModal from "../../ui/Modal/DeleteConfirmModal";
import Error from "../../ui/InfoMsg/Error";

const Quizzes = () => {
  const { data: quizzes, isLoading, isError, isSuccess } = useGetQuizzessQuery();

  // delete quiz
  const [deleteQuiz, { isLoading: deleteLoading, isError: deleteError, isSuccess: deleteSuccess, error: deleteData }] = useDeleteQuizMutation();

  // video query //up components query for avoiding Loading delay
  const videoQuery = useGetVideosQuery();

  // add video modal
  const [addStatus, setAddStatus] = useState(false);

  // edit video data and modal
  const [editQuiz, setEditQuiz] = useState({});
  const [editStatus, setEditStatus] = useState(false);

  // set delete confirm modal
  const [deleteStatus, setDeleteStatus] = useState(false);
  const [deleteID, setDeleteId] = useState("");

  // create content for quizzes
  let content = null;
  if (isLoading) {
    content = <h3>Loading...</h3>;
  }
  if (!isLoading && isError) {
    content = <h3>There was an error!</h3>;
  }
  if (!isLoading && !isError && isSuccess) {
    const quizLength = quizzes.length;
    if (quizLength === 0) {
      content = <h3>Video list is empty!</h3>;
    } else if (quizLength >= 0) {
      content = quizzes.map(quiz => (
        <SingleQuiz
          quiz={quiz}
          setEdit={setEditQuiz}
          setStatus={setEditStatus}
          key={quiz.id}
          setDeleteId={setDeleteId}
          setDeleteStatus={setDeleteStatus}
        />
      ));
    }
  }

  // handle Quiz delete
  const handleVideoDelete = delId => {
    deleteQuiz(delId);
  };

  // is delete successful modal will cloase
  useEffect(() => {
    if (deleteSuccess) {
      setDeleteStatus(false);
    }
  }, [deleteSuccess]);

  return (
    <>
      <div className="px-3 py-20 bg-opacity-10">
        <div className="w-full flex">
          <button disabled={isLoading || videoQuery?.isLoading} onClick={() => setAddStatus(true)} className="btn ml-auto">
            Add Quiz
          </button>
        </div>
        <div className="overflow-x-auto mt-4">
          <table className="divide-y-1 text-base divide-gray-600 w-full">
            <thead>
              <tr>
                <th className="table-th">Question</th>
                <th className="table-th">Video</th>
                <th className="table-th justify-center">Action</th>
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
        <QuizAddForm setStatus={setAddStatus} />
      </Modal>
      {/* edit form modal */}
      <Modal modalOpen={editStatus} setModalOpen={setEditStatus} MBoxWidth={900} outCickHide={false}>
        <QuizEditForm videoQuery={videoQuery} editQuiz={editQuiz} setStatus={setEditStatus} />
      </Modal>
      {/* delete modal */}

      {/* delete modal */}
      <Modal modalOpen={deleteStatus} setModalOpen={setDeleteStatus} MBoxWidth={400} outCickHide={false}>
        <DeleteConfirmModal deleteID={deleteID} deleteAction={handleVideoDelete} setStatus={setDeleteStatus} />
      </Modal>
    </>
  );
};

export default Quizzes;
