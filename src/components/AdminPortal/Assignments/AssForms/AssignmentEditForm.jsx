/** @format */

import React, { useEffect, useState } from "react";
import "../../../../forms.css";
import { GoX } from "react-icons/go";
import { compareTwoArray } from "../../../../utils/compare";
import { useEditAssignmentMutation } from "../../../../features/api/assignments/assignmentsApi";

const AssignmentEditForm = ({ editAss, setStatus, videoQuery, assignments }) => {
  // edit assignment mutation
  const [editAssignment, { isLoading: assLoading, isError: assError, isSuccess: assSuccess, error: assErrorMsg, data: assData }] =
    useEditAssignmentMutation();
  // get all video data
  const { data: videos, isLoading, isError, isSuccess } = videoQuery || {};

  // edit data
  const { id } = editAss || {};

  // selecteable videos block start
  // filter already add assignment with video
  // not Assigned Assignment Videos
  const conpearFunction = (videosArray, assArray) => videosArray.id === assArray.video_id;
  const filteredVideos = compareTwoArray(videos, assignments, conpearFunction);
  // find edit video data
  const editVideoData = videos.filter(video => video.id === editAss.video_id);
  // selectedable videos
  const selectedable = [...editVideoData, ...filteredVideos];
  // create video title for select
  let selectOptions = "";
  if (isSuccess) {
    selectOptions = selectedable.map(video => (
      <option key={video.id} value={video.id}>
        {video.title}
      </option>
    ));
  }
  // selecteable videos block end

  // console.log(videos);
  // Form data state // Assignment edit form
  const [title, setTitle] = useState(editAss.title);
  const [totalMark, setTotalMark] = useState(editAss.totalMark);
  const [videoID, setVideoID] = useState(editAss.video_id);

  //Handle form submit // Assignment edit form
  // console.log(videos);
  const HandleEditAssignmentSubmit = e => {
    e.preventDefault();
    // find selected video title
    const relatedVideo = videos.length > 0 ? videos.filter(item => item.id === +videoID)[0] : {};
    console.log(relatedVideo);
    let data = {
      title,
      video_id: +videoID,
      video_title: relatedVideo.title,
      totalMark,
    };

    editAssignment({ id, data });
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
            <h3>Edit Assignment</h3>
          </div>

          <button onClick={() => setStatus(false)}>
            <GoX />
          </button>
        </div>
        <div className="fromBody">
          <form onSubmit={HandleEditAssignmentSubmit} method="POST">
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

export default AssignmentEditForm;
