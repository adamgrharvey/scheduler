const getAppointmentsForDay = function(state, day) {
  let out = [];
  for (let i = 0; i < state.days.length; i++) {
    if (state.days[i].name === day) {
      out = state.days[i].appointments.slice();
      break;
    }
  }

  for (let i = 0; i < out.length; i++) {
    out[i] = state.appointments[out[i]];
  }
  return out;
}



const getInterview = function(state, interview) {
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

export {getAppointmentsForDay, getInterview};