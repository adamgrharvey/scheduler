import React, { useState } from 'react';
import InterviewerList from 'components/InterviewerList';
import Button from '../Button';

export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const reset = function () {
    setStudent("");
    setInterviewer(null);
    setError("");
  }

  const cancel = function () {
    reset()
    props.onCancel();
  }

  const validate = function () {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }
    if (!interviewer) {
      setError("Please select an interviewer");
      return;
    } else {
      setError("");
      props.onSave(student, interviewer);
    }
  }

  return (

    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={event => {
          event.preventDefault();
        }} autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            value={student}
            type="text"
            placeholder="Enter Student Name"
            onChange={(event) => {setStudent(event.target.value); setError("");}}
            data-testid="student-name-input"
          />
          <section className="appointment__validation">{error} </section>
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={(event) => {setInterviewer(event); setError("")}}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={() => {
            cancel();
          }}>Cancel</Button>
          <Button confirm onClick={() => {
            validate();
          }}>Save</Button>
        </section>
      </section>
    </main>
  );
};


