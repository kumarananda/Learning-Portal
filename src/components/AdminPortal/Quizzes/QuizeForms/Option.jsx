/** @format */

import React from "react";

function Option({ data, setOptions }) {
  const handleOptionvalue = e => {
    setOptions(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleOptionChecked = e => {
    setOptions(prev => ({
      ...prev,
      [e.target.name]: e.target.checked,
    }));
  };
  return (
    <>
      <div className="optionBox ">
        <div className="optionName">
          <div className="input_box">
            <label>
              Option {data.id}
              <input value={data.option} onChange={handleOptionvalue} type="text" name="option" required />
            </label>
          </div>
        </div>
        <div className="optionSelect">
          <div className="input_box">
            <div className="isCorrect">
              Correct
              <input checked={data.isCorrect} onChange={handleOptionChecked} type="checkbox" name="isCorrect" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Option;
