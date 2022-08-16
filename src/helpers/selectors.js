const getAppointmentsForDay = function (state, day) {
  let appointmentArr = [];
  for (let i = 0; i < state.days.length; i++) {
    if (state.days[i].name === day) {
      appointmentArr = state.days[i].appointments.slice();
      break;
    }
  }

  for (let i = 0; i < appointmentArr.length; i++) {
    appointmentArr[i] = state.appointments[appointmentArr[i]];
  }
  return appointmentArr;
}

const getInterviewersForDay = function (state, day) {
  let interviewersArr = [];
  // go through all the days looking for the day we are checking for
  for (let i = 0; i < state.days.length; i++) {
    if (state.days[i].name === day) {
      // when we find it, copy the arr of interviewers IDs i.e. [1,3,5,6,7]
      interviewersArr = state.days[i].interviewers.slice();
      break;
    }
  }
  // using arr of interviewer IDs, turn those IDs into full interviewer profiles as objects. we are converting the array of IDs to an array of objects.
  /* i.e.
  1: {
    id: 1
    name: "Sylvia Palmer"
    avatar: "https://i.imgur.com/LpaY82x.png"
  }
  */
  for (let i = 0; i < interviewersArr.length; i++) {
    interviewersArr[i] = state.interviewers[interviewersArr[i]];
  }
  return interviewersArr;
}


const getInterview = function (state, interview) {
  if (interview) {
    let interviewData =
    {
      "student": interview.student,
      "interviewer": state.interviewers[interview.interviewer]
    };
    return interviewData;
  } else {
    return null;
  }

}

export { getAppointmentsForDay, getInterviewersForDay, getInterview };