/** @format */

import React, { useEffect, useState } from "react";

const SingleQuiz = ({ quiz, index, compare, setCorr }) => {
  const { id, question, options = [], video_id } = quiz || {};

  // options state
  const [option1, setOption1] = useState(false);
  const [option2, setOption2] = useState(false);
  const [option3, setOption3] = useState(false);
  const [option4, setOption4] = useState(false);

  //
  const anwArray = [option1, option2, option3, option4];
  const quizArray = compare[index].map(com => com.isCorrect);
  const isAnswerCorrect = anwArray.toString() === quizArray.toString();

  useEffect(() => {
    //
    if (isAnswerCorrect) {
      setCorr(prev => ({
        ...prev,
        ["corrct" + (index + 1)]: true,
      }));
    } else {
      setCorr(prev => ({
        ...prev,
        ["corrct" + (index + 1)]: false,
      }));
    }
  }, [isAnswerCorrect, index]);

  return (
    <>
      <div className="quiz">
        <h6 className="question" style={{ fontSize: "15px" }}>
          {question}
        </h6>
        <div className="quizOptions">
          <label className={option1 ? "optionChecked" : ""}>
            <input onChange={e => setOption1(!option1)} type="checkbox" name={`option1`} />
            {options[0].option}
          </label>
          <label className={option2 ? "optionChecked" : ""}>
            <input onChange={e => setOption2(!option2)} type="checkbox" name={`option2`} />
            {options[1].option}
          </label>
          <label className={option3 ? "optionChecked" : ""}>
            <input onChange={e => setOption3(!option3)} type="checkbox" name={`option3`} />
            {options[2].option}
          </label>
          <label className={option4 ? "optionChecked" : ""}>
            <input onChange={e => setOption4(!option4)} type="checkbox" name={`option4`} />
            {options[3].option}
          </label>
        </div>
      </div>
    </>
  );
};

export default SingleQuiz;

// console.log("-------");
// console.log([option1, option2, option3, option4]);
// console.log(compare[index].map(com => com.isCorrect));
// console.log(compare[index].map(com => com.isCorrect).toString() === [option1, option2, option3, option4].toString());
// console.log(totalQuiz);

// const [selectedAns, setSelectedAns] = useState({ option1: false, option2: false, option3: false, option4: false });

// const handleGetAns = (e, ind) => {
//   console.log(e.target.checked);
//   setSelectedAns(prev => ({
//     ...prev,
//     [e.target.name]: e.target.checked,
//   }));
// };
// console.log(selectedAns);

{
  /* {options.map((opt, optIndex) => (
            <label className={selectedAns[optIndex] ? "optionChecked" : ""} key={opt.id}>
              <input onChange={e => handleGetAns(e, optIndex)} type="checkbox" name={`option${optIndex + 1}`} />
              {opt.option}
            </label>
          ))} */
}
