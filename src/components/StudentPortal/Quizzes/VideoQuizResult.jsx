/** @format */

import React from "react";

const VideoQuizResult = ({ result }) => {
  console.log(result);
  const { totalQuiz, totalCorrect, totalWrong, mark, totalMark } = result || {};
  return (
    <div className="w-full flex justify-center">
      <div className="flex w-2/4 justify-start">
        <div className="fromWraper">
          <div className="fromHeader">
            <div className="text-xl p-6">
              <h6>Your quiz result for this video</h6>
              <br />
              <div className="flex w-full justify-between">
                <h5>Total quiz : </h5>
                <h5>{totalQuiz}</h5>
              </div>
              <div className="flex w-full justify-between">
                <h5>Correct answer : </h5>
                <h5>{totalCorrect}</h5>
              </div>
              <div className="flex w-full justify-between">
                <h5>Worng answer : </h5>
                <h5>{totalWrong}</h5>
              </div>
              <div className="flex w-full justify-between">
                <h5>Total Mark : </h5>
                <h5>{totalMark}</h5>
              </div>
              <div className="flex w-full justify-between">
                <h5>Achieved Mark : </h5>
                <h5>{mark}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoQuizResult;
