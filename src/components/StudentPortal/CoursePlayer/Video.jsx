/** @format */

import React from "react";
import { showDateMonthYear } from "../../../utils/date";

const Video = ({ video, assButton, quizButton }) => {
  const { id: videoId, title, description, url, views, duration, createdAt } = video || {};
  return (
    <>
      <>
        <iframe
          width="100%"
          className="aspect-video"
          src={video.url}
          title="Things I wish I knew as a Junior Web Developer - Sumit Saha - BASIS SoftExpo 2023"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboardWrite; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>

        <div>
          <h1 className="text-lg font-semibold tracking-tight text-slate-100">{title}</h1>
          <h2 className=" pb-4 text-sm leading-[1.7142857] text-slate-400">Uploaded on {showDateMonthYear(createdAt)} </h2>
          <div className="flex gap-4 justify-between">
            {assButton}
            {quizButton}
          </div>
          <p className="mt-4 text-sm text-slate-400 leading-6">{description}</p>
        </div>
      </>
    </>
  );
};

export default Video;
