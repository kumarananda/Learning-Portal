/** @format */

import React, { useEffect, useState } from "react";
import { useGetQuizForVideoQuery } from "../../../features/api/quizzes/quizzesApi";
import { useNavigate, useParams } from "react-router-dom";
import SingleQuiz from "./SingleQuiz";
import { useSelector } from "react-redux";
import { useAddVidoeQuizMarkMutation, useGetStuVideoQuizMarksQuery } from "../../../features/api/quizzesMark/quizzMarkApi";
import VideoQuizResult from "./VideoQuizResult";
import swal from "sweetalert";
const Quizzes = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  // user data
  const { id: student_id, name: student_name } = useSelector(state => state.auth.user);

  // get user quiz data if submited for this video
  const {
    data: stuVideoQuizzs,
    isSuccess: qMarkSuccess,
    isLoading: qMarkLoading,
    isError: qMarkError,
    refetch: quizRefetch,
  } = useGetStuVideoQuizMarksQuery({ student_id, video_id: videoId }, { skip: false });

  // use quiz query
  const { data: quizdata, isLoading, isSuccess, isError } = useGetQuizForVideoQuery(videoId);

  // use quiz/quizzs mark add
  const [addVideoQuizMark, { isLoading: addLoading, isError: addError, isSuccess: addSuccess, addErrorData }] = useAddVidoeQuizMarkMutation();

  // correct count
  const [corrQuiz, setCorrQuiz] = useState({}); // build with object key type
  const correctArray = Object.values(corrQuiz); // convart Boolean array
  const countCorret = (acc, curr) => {
    if (curr) {
      return acc + 1;
    } else {
      return acc;
    }
  };
  // total correctAnswer
  const totalCorrect = correctArray.reduce(countCorret, 0);

  let content = null;
  let videoTitle = undefined;
  let compare = [];
  let totalQuiz = undefined;
  if (isLoading) {
    content = "Loading...";
  }
  if (!isLoading && isError) {
    content = "Thare is an error!";
  }
  if (!isLoading && !isError && isSuccess) {
    if (!quizdata?.length) {
      content = "Quiz not found!";
    } else if (quizdata?.length > 0) {
      totalQuiz = quizdata.length;
      videoTitle = quizdata[0].video_title;
      quizdata.map(item => {
        compare.push(item.options);
      });
      content = quizdata.map((quiz, index) => <SingleQuiz quiz={quiz} setCorr={setCorrQuiz} compare={compare} key={quiz.id} index={index} />);
    }
  }

  // submit quiz mark
  const handleQuizMarkSubmit = () => {
    // quiz mark data Object
    const quizMarkdata = {
      student_id,
      student_name,
      video_id: videoId,
      video_title: videoTitle,
      totalQuiz: totalQuiz,
      totalCorrect: totalCorrect,
      totalWrong: totalQuiz - totalCorrect,
      totalMark: totalQuiz * 5,
      mark: totalCorrect * 5,
    };
    // alert(JSON.stringify(quizMarkdata));
    addVideoQuizMark(quizMarkdata);
  };

  useEffect(() => {
    if (addSuccess) {
      navigate("/leaderboard");
    }
  }, [addSuccess]);

  useEffect(() => {
    if (addError) {
      alert(addErrorData);
    }
  }, [addError]);

  let parentContent = null;
  if (qMarkLoading) {
    parentContent = "Loading....";
  }
  if (!qMarkLoading && qMarkError) {
    parentContent = "Theare was an error!";
  }
  if (!qMarkLoading && !qMarkError && qMarkSuccess) {
    let answeredLengeh = stuVideoQuizzs.length;
    if (answeredLengeh === 0) {
      parentContent = (
        <>
          <div className="space-y-8">{content}</div>

          {quizdata?.length > 0 && (
            <button
              onClick={handleQuizMarkSubmit}
              className="px-4 py-2 rounded-full bg-cyan block ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95"
            >
              Submit
            </button>
          )}
        </>
      );
    } else if (answeredLengeh > 0) {
      parentContent = <VideoQuizResult result={stuVideoQuizzs[0]} />;
    }
  }

  return (
    <>
      <div className="mx-auto max-w-7xl px-5 lg:px-0">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">{videoTitle}</h1>
          <p className="text-sm text-slate-200">Each question contains 5 Mark</p>
        </div>

        {parentContent}
      </div>
    </>
  );
};

export default Quizzes;
