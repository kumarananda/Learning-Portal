/** @format */

import React from "react";
import { useGetAssignmentMarksQuery } from "../../../features/api/assignmentMark/assignmentMarkApi";
import { useGetAllStudentsQuery } from "../../../features/api/students/studentsApi";
import { useGetAllQuizzesMarksQuery } from "../../../features/api/quizzesMark/quizzMarkApi";
import UserStudent from "./UserStudent";
import AllStudents from "./AllStudents";
import { useSelector } from "react-redux";

const Leaderboard = () => {
  // user data
  const { id: student_id } = useSelector(state => state.auth.user);
  // students data
  const { data: students, isLoading: stuLoading, isError: stuError, isSuccess: stuSuccess, error: stuErrorData } = useGetAllStudentsQuery();
  // all students quizzis marks
  const { data: quizzesMarks, isLoading: qLoading, isSuccess: qSuccess, isError: qError, error: qErrorData } = useGetAllQuizzesMarksQuery();
  // all students assignments marks
  const { data: assMarks, isLoading: amLoading, isSuccess: amSuccess, isError: amError } = useGetAssignmentMarksQuery();

  // all student filter and rankink creation
  // console.log("filtered");
  function filteringWithNewValue(students, quizzesMarks, assMarks) {
    const makeFild = students
      ?.map(stu => {
        const reduceFunMark = (acc, curr) => {
          let mark = Number(curr?.mark);
          return acc + mark ? mark : 0;
        };
        let quizMark = quizzesMarks?.filter(item => Number(item.student_id) == Number(stu.id)).reduce(reduceFunMark, 0);
        let assMark = assMarks?.filter(item => Number(item.student_id) == Number(stu.id)).reduce(reduceFunMark, 0);

        return {
          id: stu.id,
          name: stu.name,
          grandTotal: assMark + quizMark,
          totalQuizMark: quizMark,
          totalAssMark: assMark,
        };
      })
      ?.sort((a, b) => {
        return Number(b.grandTotal) - Number(a.grandTotal);
      });

    console.log(makeFild);

    return makeFild;
  }

  console.log();

  // content creation
  let allStudentContent = null;
  let userStudentContent = null;
  if (stuLoading || qLoading || amLoading) {
    allStudentContent = (
      <tr>
        <td> Loading...</td>
      </tr>
    );
    userStudentContent = (
      <tr className="border-2 border-cyan">
        <td> Loading...</td>
      </tr>
    );
  } else {
    if (stuError || qError || amError) {
      allStudentContent = <tr>Thare was an error</tr>;
      userStudentContent = <tr>Thare was an error</tr>;
    } else {
      if (stuSuccess && qSuccess && amSuccess) {
        // filtered result
        const filteredStudents = filteringWithNewValue(students, quizzesMarks, assMarks);
        const unique = [];
        filteredStudents.map(x => (unique.filter(a => a.grandTotal == x.grandTotal).length > 0 ? null : unique.push(x)));
        const ranking = unique.map(u => u.grandTotal);

        // console.log(ranking);

        allStudentContent = <AllStudents student_id={student_id} students={filteredStudents} ranking={ranking} />;
        userStudentContent = <UserStudent student_id={student_id} students={filteredStudents} ranking={ranking} />;
      } else {
        allStudentContent = (
          <tr>
            <td> Loading...</td>
          </tr>
        );
        userStudentContent = (
          <tr className="border-2 border-cyan">
            <td> Loading...</td>
          </tr>
        );
      }
    }
  }

  return (
    <>
      <div>
        <h3 className="text-lg font-bold">Your Position in Leaderboard</h3>
        <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
          <thead>
            <tr>
              <th className="table-th !text-center">Rank</th>
              <th className="table-th !text-center">Name</th>
              <th className="table-th !text-center">Quiz Mark</th>
              <th className="table-th !text-center">Assignment Mark</th>
              <th className="table-th !text-center">Total</th>
            </tr>
          </thead>
          <tbody>{userStudentContent}</tbody>
        </table>
      </div>

      <div className="my-8">
        <h3 className="text-lg font-bold">Top 20 Result</h3>
        <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
          <thead>
            <tr className="border-b border-slate-600/50">
              <th className="table-th !text-center">Rank</th>
              <th className="table-th !text-center">Name</th>
              <th className="table-th !text-center">Quiz Mark</th>
              <th className="table-th !text-center">Assignment Mark</th>
              <th className="table-th !text-center">Total</th>
            </tr>
          </thead>

          <tbody>{allStudentContent}</tbody>
        </table>
      </div>
    </>
  );
};

export default Leaderboard;
