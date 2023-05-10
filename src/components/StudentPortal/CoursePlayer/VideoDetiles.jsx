/** @format */

import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { showDateMonthYear } from "../../../utils/date";
import { useSelector } from "react-redux";
import { useGetAssignmentQuery } from "../../../features/api/assignments/assignmentsApi";
import { AssButton } from "./AssignmentComp/AssButton";
import Modal from "../../ui/Modal/Modal";
import AssSubmitModal from "./AssignmentComp/AssSubmitModal";
import { useGetAssignmentMarkQuery } from "../../../features/api/assignmentMark/assignmentMarkApi";
import ShowSubmitedModal from "./AssignmentComp/ShowSubmitedModal";
import { useGetQuizForVideoQuery } from "../../../features/api/quizzes/quizzesApi";
import { useGetStuVideoQuizMarksQuery } from "../../../features/api/quizzesMark/quizzMarkApi";
import Video from "./Video";
import { useGetVideoQuery } from "../../../features/api/videos/videosApi";

const VideoDetiles = ({ firstId }) => {
  const { id: student_id, name: student_name } = useSelector(state => state.auth.user);
  const { videoId } = useParams();

  const queryId = (videoId ? videoId : firstId).toString();

  // Single video
  const { data: sVideo, isLoading: isSVLoading, isError: isSVError, isSuccess: isSVSuccess, error: SVerror } = useGetVideoQuery(queryId);

  // get assignment data
  const {
    data: assignment,
    refetch: assRefetch,
    isLoading: assLoading,
    isError: assError,
    isSuccess: assSuccess,
    error: ass_error,
  } = useGetAssignmentQuery(queryId);

  // Quiz data for this video
  const { data: quizdata, isLoading, isSuccess, isError } = useGetQuizForVideoQuery(queryId);
  // user data

  // get user assignment for this video
  const { data: submitedAss, refetch: assMarkRefetch } = useGetAssignmentMarkQuery(
    { student_id, assignment_id: assignment?.id },
    { skip: !assignment?.id }
  );
  // get user quiz data if submited for this video
  const {
    data: stuVideoQuizzs,
    isSuccess: qMarkSuccess,
    refetch: quizRefetch,
  } = useGetStuVideoQuizMarksQuery({ student_id, video_id: queryId }, { skip: false });

  // ass modal status
  const [assSubmit, setAssSubmit] = useState(false);
  // assignment Show
  const [showSubmit, setShowSubmit] = useState(false);

  // create assignment button
  let assButton = null;
  if (assLoading) {
    assButton = <AssButton>Loading...</AssButton>; // Loading
  }
  if (!assLoading && assError) {
    assButton = <AssButton>No Assignment</AssButton>;
  }
  if (!assLoading && !assError && assSuccess) {
    if (!submitedAss || !submitedAss?.length) {
      assButton = (
        <AssButton action={setAssSubmit} value={true}>
          Submit Assignment
        </AssButton>
      );
    } else if (submitedAss?.length > 0) {
      assButton = (
        <AssButton action={setShowSubmit} value={true}>
          Submitted Assignment
        </AssButton>
      );
    }
  }

  // make quize button
  let quizButton = null;
  if (isLoading) {
    quizButton = <AssButton>Loading...</AssButton>;
  }
  if (!isLoading && isError) {
    quizButton = <AssButton>No Quiz</AssButton>;
  }
  if (!isLoading && !isError && isSuccess) {
    if (!quizdata?.length) {
      quizButton = <AssButton>No Quiz</AssButton>;
    } else if (quizdata?.length > 0) {
      if (qMarkSuccess) {
        if (stuVideoQuizzs.length > 0) {
          quizButton = (
            <Link
              to={`/quiz/${queryId}`}
              className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
            >
              View Quiz Marks
            </Link>
          );
        } else {
          quizButton = (
            <Link
              to={`/quiz/${queryId}`}
              className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
            >
              Participate Quiz
            </Link>
          );
        }
      } else {
        quizButton = (
          <Link
            to={`/quiz/${videoId}`}
            onClick={e => e.preventDefault()}
            className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
          >
            Participate Quiz
          </Link>
        );
      }
    }
  }

  // from single query
  let content = null;
  if (isSVLoading) {
    content = "Loading...";
  }
  if (!isSVLoading && isSVError) {
    content = "Thare was an error!";
  }
  if (!isSVLoading && !isSVError && isSVSuccess) {
    if (!sVideo?.id) {
      content = "Video not found";
    }
    if (sVideo?.id) {
      content = <Video video={sVideo} quizButton={quizButton} assButton={assButton} />;
    }
  }

  return (
    <>
      {/* content */}
      <div className="col-span-full w-full space-y-8 lg:col-span-2">{content}</div>

      {/* Assingment Submit Modal */}
      <Modal modalOpen={assSubmit} setModalOpen={setAssSubmit} MBoxWidth={600} outCickHide={true}>
        <AssSubmitModal
          assRefetch={assRefetch}
          assMarkRefetch={assMarkRefetch}
          student_id={student_id}
          student_name={student_name}
          assignment={assignment}
          setStatus={setAssSubmit}
        />
      </Modal>
      {/* Show submited assignment Modal */}
      <Modal modalOpen={showSubmit} setModalOpen={setShowSubmit} MBoxWidth={600} outCickHide={true}>
        <ShowSubmitedModal assignment={submitedAss?.length ? submitedAss[0] : {}} setStatus={setShowSubmit} />
      </Modal>
    </>
  );
};

export default VideoDetiles;
