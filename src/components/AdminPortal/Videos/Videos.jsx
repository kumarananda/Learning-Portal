/** @format */

import React, { useEffect, useState } from "react";
import { useDeleteVideoMutation, useGetVideosQuery } from "../../../features/api/videos/videosApi";
import Modal from "../../ui/Modal/Modal";

import SingleVideo from "./SingleVideo";
import VideoAddForm from "./VideoForms/VideoAddForm";
import VideoEditForm from "./VideoForms/VideoEditForm";
import Error from "../../ui/InfoMsg/Error";
import DeleteConfirmModal from "../../ui/Modal/DeleteConfirmModal";

const Videos = () => {
  // get all videos
  const { data: videos, isLoading, isError, isSuccess } = useGetVideosQuery();
  // delete video query
  const [deleteVideo, { isLoading: deleteLoading, isError: deleteError, isSuccess: deleteSuccess, error: deleteData }] = useDeleteVideoMutation();

  // add video modal state
  const [addStatus, setAddStatus] = useState(false);

  // edit video data and modal
  const [editVideo, setEditvideo] = useState({});
  const [editStatus, setEditStatus] = useState(false);

  // set delete confirm modal
  const [deleteStatus, setDeleteStatus] = useState(false);
  const [deleteID, setDeleteId] = useState("");

  // create content for videos
  let content = null;
  if (isLoading) {
    content = <h3>Loading...</h3>;
  }
  if (!isLoading && isError) {
    content = <h3>There was an error!</h3>;
  }
  if (!isLoading && !isError && isSuccess) {
    const videoLength = videos.length;
    if (videoLength === 0) {
      content = <h3>Video list is empty!</h3>;
    } else if (videoLength >= 0) {
      content = videos.map(video => (
        <SingleVideo
          key={video.id}
          video={video}
          setEdit={setEditvideo}
          setStatus={setEditStatus}
          deleteStatus={setDeleteStatus}
          setDeleteId={setDeleteId}
        />
      ));
    }
  }

  // handle video delete
  const handleVideoDelete = delId => {
    deleteVideo(delId);
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
          <button onClick={() => setAddStatus(true)} className="btn ml-auto">
            Add Video
          </button>
        </div>
        <div className="overflow-x-auto mt-4">
          <table className="divide-y-1 text-base divide-gray-600 w-full">
            <thead>
              <tr>
                <th className="table-th">Video Title</th>
                <th className="table-th">Description</th>
                <th className="table-th">Action</th>
              </tr>
            </thead>
            {/* Single video items */}
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
        <VideoAddForm setStatus={setAddStatus} />
      </Modal>

      {/* edit form modal */}
      <Modal modalOpen={editStatus} setModalOpen={setEditStatus} MBoxWidth={900} outCickHide={false}>
        <VideoEditForm editVideo={editVideo} setStatus={setEditStatus} />
      </Modal>

      {/* delete modal */}
      <Modal modalOpen={deleteStatus} setModalOpen={setDeleteStatus} MBoxWidth={400} outCickHide={false}>
        <DeleteConfirmModal deleteID={deleteID} deleteAction={handleVideoDelete} setStatus={setDeleteStatus} />
      </Modal>
    </>
  );
};

export default Videos;
