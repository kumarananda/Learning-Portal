/** @format */

import React, { useEffect, useState } from "react";
import "../../../../forms.css";
import { GoX } from "react-icons/go";
import { useGetVideosQuery } from "../../../../features/api/videos/videosApi";
import { useAddAssignmentMutation } from "../../../../features/api/assignments/assignmentsApi";
import { compareTwoArray } from "../../../../utils/compare";

const AssignmentAddForm = ({ setStatus, assignments }) => {
  // all videos query
  const { data: videos, isLoading, isError, isSuccess } = useGetVideosQuery();
  // add assignment mutation
  const [addAssignment, { isLoading: assLoading, isError: assError, isSuccess: assSuccess, error: assErrorMsg, data: assData }] =
    useAddAssignmentMutation();

  // filter already add assignment with video
  // not Assigned Assignment Videos
  const conpearFunction = (videosArray, assArray) => videosArray.id === assArray.video_id;
  const filteredVideos = compareTwoArray(videos, assignments, conpearFunction);

  // create video title for select
  let selectOptions = "";
  if (isSuccess) {
    selectOptions = filteredVideos.map(video => (
      <option key={video.id} value={video.id}>
        {video.title}
      </option>
    ));
  }

  // Form data state // Assignment edit form
  const [title, setTitle] = useState("");
  const [totalMark, setTotalMark] = useState("");
  const [videoID, setVideoID] = useState("");

  //Handle form submit // Assignment edit form
  const HandleAddAssignmentSubmit = e => {
    e.preventDefault();
    // find selected video title
    const relatedVideo = videos.length > 0 ? videos.filter(item => item.id === +videoID)[0] : {};
    let data = {
      title,
      video_id: +videoID,
      video_title: relatedVideo.title,
      totalMark,
    };

    addAssignment(data);
  };

  // if success modal off
  useEffect(() => {
    if (assSuccess) {
      // alert modal will update hare
      setStatus(false);
    }
  }, [assSuccess]);

  return (
    <>
      <div className="fromWraper">
        <div className="fromHeader">
          <div className="formTitle">
            <h3>Add New Assignment</h3>
          </div>

          <button onClick={() => setStatus(false)}>
            <GoX />
          </button>
        </div>
        <div className="fromBody">
          <form onSubmit={HandleAddAssignmentSubmit} method="POST">
            <div className="input_box">
              <label htmlFor="assignment_title">Title</label>
              <input
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
                id="assignment_title"
                type="text"
                name="title"
                placeholder="Assignment Title"
              />
            </div>

            <div className="input_box">
              <label htmlFor="video_title">Video title</label>
              <select required value={videoID} onChange={e => setVideoID(e.target.value)} id="video_title" name="video_title">
                <option value="" hidden>
                  Select video title
                </option>
                {selectOptions}
              </select>
            </div>
            <div className="input_box justify-endSkiped">
              <label htmlFor="assignment_mark">Total mark</label>
              <input
                value={totalMark}
                onChange={e => setTotalMark(e.target.value)}
                id="assignment_mark"
                type="number"
                name="totalMark"
                placeholder="Assignment mark"
                required
                className="numberInput hideNumberArrow"
              />
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
            {/* action msg's */}
            {assLoading && <h3>Updating...</h3>}
            {assError && <h3>{assErrorMsg.message}</h3>}
          </form>
        </div>
      </div>
    </>
  );
};

export default AssignmentAddForm;
