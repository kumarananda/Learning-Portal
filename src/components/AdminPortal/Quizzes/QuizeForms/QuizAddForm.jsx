/** @format */

import React, { useEffect, useState } from "react";
import "../../../../forms.css";
import { GoX } from "react-icons/go";
import { useGetVideosQuery } from "../../../../features/api/videos/videosApi";
import Option from "./Option";
import { useAddQuizMutation } from "../../../../features/api/quizzes/quizzesApi";
import swal from "sweetalert";

const QuizAddForm = ({ setStatus }) => {
  // video query for selection
  const { data: videos, isLoading, isError, isSuccess } = useGetVideosQuery();
  // edit quiz query
  const [addQuizMutation, { isLoading: quizLoading, isError: quizError, isSuccess: quizSuccess, error: quizErrorData }] = useAddQuizMutation();

  // create video title for select related video
  let selectOptions = "";
  if (isSuccess) {
    selectOptions = videos.map(video => (
      <option key={video.id} value={video.id}>
        {video.title}
      </option>
    ));
  }
  // console.log(videos);
  // Form data state // Assignment edit form
  const [question, setQuestion] = useState("");
  const [videoID, setVideoID] = useState("");

  // options state
  const [options1, setOptions1] = useState({ id: 1, option: "", isCorrect: false });
  const [options2, setOptions2] = useState({ id: 2, option: "", isCorrect: false });
  const [options3, setOptions3] = useState({ id: 3, option: "", isCorrect: false });
  const [options4, setOptions4] = useState({ id: 4, option: "", isCorrect: false });

  //Handle form submit // Assignment edit form

  const HandleAddAssignmentSubmit = e => {
    e.preventDefault();
    // find selected video title
    const relatedVideo = videos.length > 0 ? videos.filter(item => item.id === +videoID)[0] : {};
    console.log(relatedVideo);
    let data = {
      question,
      video_id: +videoID,
      video_title: relatedVideo.title,
      options: [options1, options2, options3, options4],
    };
    if (!options1.isCorrect && !options2.isCorrect && !options3.isCorrect && !options4.isCorrect) {
      swal("Need select at least one correct option.", "error");
    } else {
      addQuizMutation(data);
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
            <h3>Add New Quiz</h3>
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

          {/* action msg's */}
          {quizLoading && <h3>Updating...</h3>}
          {quizError && <h3>{quizErrorData.message}</h3>}
        </div>
      </div>
    </>
  );
};

export default QuizAddForm;
