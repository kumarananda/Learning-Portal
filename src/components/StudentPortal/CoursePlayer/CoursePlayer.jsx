/** @format */

import React, { useState } from "react";
import { useGetVideosQuery } from "../../../features/api/videos/videosApi";
// import { useParams } from "react-router-dom";
import CourseVideoLink from "./CourseVideoLink";
import VideoDetiles from "./VideoDetiles";

const CoursePlayer = () => {
  // const { videoId } = useParams();
  // get all videos
  const { data: videos, isLoading, isError, isSuccess, error } = useGetVideosQuery();

  let content = null;
  let firstId = undefined;
  let videoPrev = null;
  if (isLoading) {
    content = "Loading...";
    videoPrev = "Loading...";
  }
  if (!isLoading && isError) {
    content = "Thare was an error!";
    videoPrev = "Thare was an error!";
  }
  if (!isLoading && !isError && isSuccess) {
    const dataLength = videos.length;
    if (dataLength === 0) {
      content = "Video not found";
      videoPrev = "Video not found";
    }
    if (dataLength > 0) {
      videoPrev = null;
      firstId = videos[0].id;
      content = videos.map((video, index) => <CourseVideoLink video={video} key={video.id} index={index} />);
    }
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-2 lg:gap-8">
        {videoPrev}
        {firstId && <VideoDetiles firstId={firstId} />}
        {/* <VideoWraper /> */}
        {/* Right sidebur all video for the course */}
        <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto bg-secondary p-4 rounded-md border border-slate-50/10 divide-y divide-slate-600/30">
          {content}
        </div>
      </div>
    </>
  );
};

export default CoursePlayer;
