import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  let spotsText = formatSpots(props.spots);

  let dayClass = classNames("day-list__item",
    {
      "day-list__item--selected": props.selected,
      "day-list__item--full": (props.spots === 0)
    })
  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{spotsText}</h3>
    </li>
  );
}



const formatSpots = function (spots) {
  if (spots < 1) {
    return "no spots remaining";
  } else if (spots === 1) {
    return "1 spot remaining"
  } else {
    return `${spots} spots remaining`
  }
}