/** @format */

import React, { useEffect, useState } from "react";
import "../../../../forms.css";
import { GoX } from "react-icons/go";
import Option from "./Option";
import { useEditQuizMutation } from "../../../../features/api/quizzes/quizzesApi";
import swal from "sweetalert";

const QuizEditForm = ({ setStatus, editQuiz, videoQuery }) => {
  const { data: videos, isLoading, isError, isSuccess } = videoQuery || {};

  // edit Quiz  Mutation
  const [editQuizMutation, { isLoading: quizLoading, isError: quizError, isSuccess: quizSuccess, error: quizErrorData }] = useEditQuizMutation();

  const { id, options } = editQuiz || {};

  // create video title for select
  let selectOptions = "";
  if (isSuccess) {
    selectOptions = videos.map(video => (
      <option key={video.id} value={video.id}>
        {video.title}
      </option>
    ));
  }

  // Form data state // Assignment edit form
  const [question, setQuestion] = useState(editQuiz.question);
  const [videoID, setVideoID] = useState(editQuiz.video_id);

  // options state
  const [options1, setOptions1] = useState({ id: 1, option: options[0].option, isCorrect: options[0].isCorrect });
  const [options2, setOptions2] = useState({ id: 2, option: options[1].option, isCorrect: options[1].isCorrect });
  const [options3, setOptions3] = useState({ id: 3, option: options[2].option, isCorrect: options[2].isCorrect });
  const [options4, setOptions4] = useState({ id: 4, option: options[3].option, isCorrect: options[3].isCorrect });

  //Handle form submit // Assignment edit form
  const HandleAddAssignmentSubmit = e => {
    e.preventDefault();
    // find selected video title
    const relatedVideo = videos.length > 0 ? videos.filter(item => item.id === +videoID)[0] : {};
    // console.log(relatedVideo);
    let data = {
      question,
      video_id: +videoID,
      video_title: relatedVideo.title,
      options: [options1, options2, options3, options4],
    };
    if (!options1.isCorrect && !options2.isCorrect && !options3.isCorrect && !options4.isCorrect) {
      swal("Need select at least one correct option.", "error");
    } else {
      editQuizMutation({ id, data });
    }
  };

  // if success modal off
  useEffect(() => {
    if (quizSuccess) {
      // alert modal will update hare

      setStatus(false);
    }
  }, [quizSuccess]);

  return (
    <>
      <div className="fromWraper" style={{ maxHeight: "95vh", overflow: "scroll" }}>
        <div className="fromHeader">
          <div className="formTitle">
            <h3>Edit Quiz</h3>
          </div>

          <button onClick={() => setStatus(false)}>
            <GoX />
          </button>
        </div>
        <div className="fromBody">
          <form onSubmit={HandleAddAssignmentSubmit} method="POST">
            <div className="input_box">
              <label htmlFor="question_title">Question</label>
              <textarea
                value={question}
                onChange={e => setQuestion(e.target.value)}
                id="question_title"
                rows={"3"}
                name="question"
                placeholder="Question"
              />
            </div>
            <div className="input_box">
              <label htmlFor="video_title">Video title</label>
              <select required value={videoID} onChange={e => setVideoID(e.target.value)} id="video_title" name="video_title">
                <option value="" hidden>
                  Select related video
                </option>
                {selectOptions}
              </select>
            </div>
            <h2 className="font-bold options">Options</h2>
            {/* Answer options  */}
            <Option data={options1} setOptions={setOptions1} />
            <Option data={options2} setOptions={setOptions2} />
            <Option data={options3} setOptions={setOptions3} />
            <Option data={options4} setOptions={setOptions4} />

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

export default QuizEditForm;
