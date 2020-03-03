import React, { useState } from "react";
import List from "../List/List";
import Table from "../Table/Table";

const StudentManage = () => {
  const [assignments, setAssignments] = useState<Array<string>>([]);
  const [students, setStudents] = useState<Array<string>>([]);
  const [grades, setGrades] = useState(Object);
  const [button, setButton] = useState("");

  const handleButtonClicked = (buttonName: string) => {
    setButton(buttonName);
  };

  /*Check out this addAssignment method*/
  const addAssignment = (assignmentName: string) => {
    const nextState = [...assignments, assignmentName];
    setAssignments(nextState);
  };

  /*Write an addStudent method here*/
  const addStudent = (studentName: string) => {
    setStudents([...students, studentName]);
  };

  const addGrade = (assignment: string, student: string, score: string) => {
    if (!(assignment in grades)) {
      grades[assignment] = {};
    }
    grades[assignment][student] = score;
    setGrades(grades);
  };

  let tabChoice = <div />;

  /*Uncomment below to render assignments*/
  if (button === "assignments") {
    tabChoice = (
      <List
        placeholder="Add Assignment..."
        currList={assignments}
        addFunction={addAssignment}
        title="Assignments"
      />
    );
  }

  /* Change below to render students*/

  if (button === "students") {
    tabChoice = (
      <List
        placeholder="Add Student..."
        currList={students}
        addFunction={addStudent}
        title="Student Roster"
      />
    );
  }

  /* Uncomment lines below to render grades*/
  if (button === "grades") {
    tabChoice = (
      <Table
        tableNames={assignments}
        rows={students}
        addFunction={addGrade}
        data={grades}
      />
    );
  }
  return (
    <>
      <div className="Box Box--spacious f4">
        <div className="Box-header">
          <h3 className="Box-title d-flex flex-justify-center">GradeBook</h3>
        </div>
      </div>
      <nav className="UnderlineNav d-flex flex-justify-center">
        <div className="UnderlineNav-body pt-6">
          <button
            className="btn btn-primary"
            onClick={() => handleButtonClicked("assignments")}
          >
            Assignments
          </button>
          <button
            className="btn btn-primary"
            onClick={() => handleButtonClicked("students")}
          >
            Students
          </button>
          <button
            className="btn btn-primary"
            onClick={() => handleButtonClicked("grades")}
          >
            Grades
          </button>
        </div>
      </nav>
      {tabChoice}
    </>
  );
};

export default StudentManage;
