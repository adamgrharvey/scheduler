import React from 'react'
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';
import { useVisualMode } from "hooks/useVisualMode.js"

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    transition(SAVING)
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview)
      .then(res => {
        transition(SHOW)
      })
      .catch(error => {
        transition(ERROR_SAVE, true)
      });
  };

  function cancel(id) {
    transition(DELETING);
    props.cancelInterview(props.id)
      .then(res => {
        transition(EMPTY)
      })
      .catch(error => {
        transition(ERROR_DELETE, true)
      });
  };

  return (
    <article data-testid="appointment" className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />

      )}
      {mode === CREATE && <Form
        interviewers={props.interviewers}
        onCancel={back}
        onSave={save}

      />}
      {mode === EDIT && <Form
        interviewers={props.interviewers}
        interviewer={props.interview.interviewer.id}
        student={props.interview.student}
        onCancel={back}
        onSave={save}
      />}
      {mode === SAVING && <Status
        message="Saving"
      />}
      {mode === ERROR_SAVE && <Error
        message="Could not save appointment."
        onClose={() => transition(SHOW)}
      />}
      {mode === DELETING && <Status
        message="Deleting"
      />}
      {mode === ERROR_DELETE && <Error
        message="Could not delete appointment."
        onClose={() => transition(SHOW)}
      />}
      {mode === CONFIRM && <Confirm
        message={"Delete the appointment?"}
        onCancel={() => transition(SHOW)}
        onConfirm={cancel}

      />}
    </article>

  );
}