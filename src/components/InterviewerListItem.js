import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  let name = "";
  if (props.selected) {
    name = props.name;
  }
  console.log(props.selected);
  let interviewerClass = classNames("interviewers__item", 
  {
    "interviewers__item--selected": props.selected
  }
  
  )

  return (
    <li className={interviewerClass} onClick={() => props.setInterviewer(props.id)} >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {name}
    </li>
  );
}