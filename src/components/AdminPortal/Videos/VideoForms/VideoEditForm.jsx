/** @format */

import React, { useEffect, useState } from "react";
import "../../../../forms.css";
import { GoX } from "react-icons/go";
import { useEditVideoMutation } from "../../../../features/api/videos/videosApi";

const VideoEditForm = ({ editVideo: editData, setStatus }) => {
  const { id } = editData || {};

  // edit vedeo mutation
  const [editVideo, { isLoading, isError, isSuccess, error }] = useEditVideoMutation(id);

  // Form data state // Video edit form
  const [formData, setFormData] = useState({
    title: editData.title,
    description: editData.description,
    duration: editData.duration,
    views: editData.views,
    url: editData.url,
  });

  // createdAt
  // Handle form data
  const handleFormData = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  //Handle form submit // Video edit form
  const HandleEditVideoSubmit = e => {
    e.preventDefault();
    editVideo({ id, data: formData });
  };

  // if success modal will off
  useEffect(() => {
    if (isSuccess) {
      //hare will be success msg actions
      setStatus(false);
    }
  }, [isSuccess]);

  return (
    <>
      <div className="fromWraper">
        <div className="fromHeader">
          <div className="formTitle">
            <h3>Edit Video Data</h3>
          </div>

          <button onClick={() => setStatus(false)}>
            <GoX />
          </button>
        </div>
        <div className="fromBody">
          <form onSubmit={HandleEditVideoSubmit} method="POST">
            <div className="input_box">
              <label htmlFor="video_title">Title</label>
              <input value={formData.title} onChange={handleFormData} id="video_title" type="text" name="title" />
            </div>
            <div className="input_box">
              <label htmlFor="video-description">Description</label>
              <textarea value={formData.description} onChange={handleFormData} id="video-description" rows={"3"} name="description" />
            </div>
            <div className="input_box">
              <label htmlFor="video-url">Url</label>
              <input value={formData.url} onChange={handleFormData} id="video-url" type="text" name="url" />
            </div>
            <div className="input_box">
              <label htmlFor="video-duration">Duration</label>
              <input value={formData.duration} onChange={handleFormData} id="video-duration" type="text" name="duration" />
            </div>
            <div className="input_box">
              <label htmlFor="video-views">Views</label>
              <input value={formData.views} onChange={handleFormData} id="video-views" type="text" name="views" />
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
            {isLoading && <h3>Updating...</h3>}
            {isError && <h3>{error.message}</h3>}
          </form>
        </div>
      </div>
    </>
  );
};

export default VideoEditForm;
