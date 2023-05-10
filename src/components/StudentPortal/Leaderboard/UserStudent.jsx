/** @format */

import React from "react";
// import { useSelector } from "react-redux";

const UserStudent = ({ students = [], ranking = [], student_id }) => {
  const findUserStudent = students?.filter(stu => Number(stu.id) == Number(student_id))[0] || {};
  console.log(findUserStudent);

  const makeRanking = totalMark => {
    return ranking?.indexOf(totalMark) + 1;
  };

  return (
    <>
      <tr className="border-2 border-cyan">
        <td className="table-td text-center font-bold">{makeRanking(findUserStudent?.grandTotal)}</td>
        <td className="table-td text-center font-bold">{findUserStudent?.name}</td>
        <td className="table-td text-center font-bold">{findUserStudent?.totalQuizMark}</td>
        <td className="table-td text-center font-bold">{findUserStudent?.totalAssMark}</td>
        <td className="table-td text-center font-bold">{findUserStudent?.grandTotal}</td>
      </tr>
    </>
  );
};

export default UserStudent;
