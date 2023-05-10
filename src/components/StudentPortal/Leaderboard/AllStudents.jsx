/** @format */

import React from "react";
// import { useSelector } from "react-redux";

const AllStudents = ({ students, ranking, student_id }) => {
  console.log(student_id);

  const makeRanking = totalMark => {
    return ranking?.indexOf(totalMark) + 1;
  };

  return (
    <>
      {students.map(stu => {
        if (makeRanking(stu.grandTotal) <= 20) {
          return (
            <tr key={stu.id} className={` ${stu.id === student_id ? " border-2 border-cyan" : "border-b border-slate-600/50"}`}>
              <td className="table-td text-center">{makeRanking(stu.grandTotal)}</td>
              <td className="table-td text-center">{stu.name}</td>
              <td className="table-td text-center">{stu.totalQuizMark}</td>
              <td className="table-td text-center">{stu.totalAssMark}</td>
              <td className="table-td text-center">{stu.grandTotal}</td>
            </tr>
          );
        } else {
          return;
        }
      })}
    </>
  );
};

export default AllStudents;
